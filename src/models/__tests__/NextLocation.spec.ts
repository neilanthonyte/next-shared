import moment from "moment-timezone";
import { makeFakeLocation } from "next-shared/src/mockData/mockLocations";

describe("getOpeningTimesForDate", () => {
  it("returns the opening and closing times if open", () => {
    const tuesdayAfternoon = 1648525254;
    const eightAm = moment
      .tz(moment.unix(tuesdayAfternoon), "Australia/Sydney")
      .hours(8)
      .minutes(0)
      .seconds(0)
      .unix();
    const sixPm = moment
      .tz(moment.unix(tuesdayAfternoon), "Australia/Sydney")
      .hours(18)
      .minutes(0)
      .seconds(0)
      .unix();

    const underTest = makeFakeLocation();
    underTest.openingHours = [
      {
        label: "Tuesday",
        opening: "8am",
        closing: "6pm",
      },
    ];

    const openingTimes = underTest.getOpeningTimesForDate(tuesdayAfternoon);

    expect(openingTimes).toEqual({
      openingTime: eightAm,
      closingTime: sixPm,
      isOpenToday: true,
    });
  });

  it("returns nulls/false if closed", () => {
    const tuesdayAfternoon = 1648525254;

    const underTest = makeFakeLocation();
    underTest.openingHours = [
      {
        label: "Tuesday",
        opening: "Closed",
        closing: "",
      },
    ];

    const openingTimes = underTest.getOpeningTimesForDate(tuesdayAfternoon);

    expect(openingTimes).toEqual({
      openingTime: null,
      closingTime: null,
      isOpenToday: false,
    });
  });
});

describe("getBusinessHoursForOperationalDay", () => {
  it("returns the opening and closing times if open", () => {
    const tuesday = "2022-03-29";
    const eightAm = moment
      .tz(tuesday, "Australia/Sydney")
      .hours(8)
      .minutes(0)
      .seconds(0)
      .unix();
    const sixPm = moment
      .tz(tuesday, "Australia/Sydney")
      .hours(18)
      .minutes(0)
      .seconds(0)
      .unix();

    const underTest = makeFakeLocation();
    underTest.openingHours = [
      {
        label: "Tuesday",
        opening: "8am",
        closing: "6pm",
      },
    ];

    const openingTimes = underTest.getBusinessHoursForOperationalDay(tuesday);

    expect(openingTimes).toEqual({
      openingTime: eightAm,
      closingTime: sixPm,
      isOpenToday: true,
    });
  });

  it("returns nulls/false if closed", () => {
    const tuesday = "2022-03-29";

    const underTest = makeFakeLocation();
    underTest.openingHours = [
      {
        label: "Tuesday",
        opening: "Closed",
        closing: "",
      },
    ];

    const openingTimes = underTest.getBusinessHoursForOperationalDay(tuesday);

    expect(openingTimes).toEqual({
      openingTime: null,
      closingTime: null,
      isOpenToday: false,
    });
  });
});

describe("getOperationalDay", () => {
  it("returns the date of the supplied timestamp, if open", () => {
    const theTimestamp = 1648525254;
    const theDate = "2022-03-29";

    const underTest = makeFakeLocation();
    underTest.openingHours = [
      {
        label: "Tuesday",
        opening: "8am",
        closing: "6pm",
      },
    ];

    expect(underTest.getOperationalDay(theTimestamp)).toEqual(theDate);
  });

  it("returns null, if closed on the day of the supplied timestamp", () => {
    const theTimestamp = 1648525254;

    const underTest = makeFakeLocation();
    underTest.openingHours = [
      {
        label: "Tuesday",
        opening: "Closed",
        closing: "",
      },
    ];

    expect(underTest.getOperationalDay(theTimestamp)).toBeNull();
  });
});

describe("findNextOperationalDay", () => {
  it("returns the next day, if open", () => {
    const tuesday = "2022-03-29";
    const theFollowingDay = "2022-03-30";

    const underTest = makeFakeLocation();
    underTest.openingHours = [
      {
        label: "Tuesday",
        opening: "8am",
        closing: "6pm",
      },
      {
        label: "Wednesday",
        opening: "8am",
        closing: "6pm",
      },
    ];

    expect(underTest.findNextOperationalDay(tuesday)).toEqual(theFollowingDay);
  });

  it("returns two days later, if not open until then", () => {
    const tuesday = "2022-03-29";
    const twoDaysLater = "2022-03-31";

    const underTest = makeFakeLocation();
    underTest.openingHours = [
      {
        label: "Tuesday",
        opening: "8am",
        closing: "6pm",
      },
      {
        label: "Wednesday",
        opening: "Closed",
        closing: "",
      },
      {
        label: "Thursday",
        opening: "8am",
        closing: "6pm",
      },
    ];

    expect(underTest.findNextOperationalDay(tuesday)).toEqual(twoDaysLater);
  });

  it("returns seven days later, if only open on the current day of the week", () => {
    const tuesday = "2022-03-29";
    const followingTuesday = "2022-04-05";

    const underTest = makeFakeLocation();
    underTest.openingHours = [
      {
        label: "Tuesday",
        opening: "8am",
        closing: "6pm",
      },
      {
        label: "Wednesday",
        opening: "Closed",
        closing: "",
      },
      {
        label: "Thursday",
        opening: "Closed",
        closing: "",
      },
    ];

    expect(underTest.findNextOperationalDay(tuesday)).toEqual(followingTuesday);
  });

  it("returns null if always closed", () => {
    const tuesday = "2022-03-29";

    const underTest = makeFakeLocation();
    underTest.openingHours = [
      {
        label: "Tuesday",
        opening: "Closed",
        closing: "",
      },
      {
        label: "Wednesday",
        opening: "Closed",
        closing: "",
      },
      {
        label: "Thursday",
        opening: "Closed",
        closing: "",
      },
    ];

    expect(underTest.findNextOperationalDay(tuesday)).toBeNull();
  });
});

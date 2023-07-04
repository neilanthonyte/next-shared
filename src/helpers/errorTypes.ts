import { EEhrDriver } from "../types/EEhrDriver";
import { EEhrKey } from "../types/EEhrKey";

/**
 * Base error info dictionary. This can basically be an any or Record<string, any>, but reserving some commonly used data throughout
 * the application to prevent misuse.
 *
 * All custom errors will extend the NextBaseError object, which takes in an optional `errorInfo` object of this type. This allows
 * additional information to be provided in the error object for logging or other purposes.
 *
 * TODO - might be worth further exploring for different info types based on the type of service
 */
export interface IErrorInfo {
  patientId?: string;
  ehrPatientId?: string;
  /**
   * contact ID is the ID of the contact in the database that uniquely identifies the contact.
   * This is usually an uuid.
   */
  contactId?: number;
  /**
   * External reference is a generated reference that is used to associate the contact with an external
   * source, usually its origin.
   *
   * it usually takes the form of `${classType}-${ehrId}-${objectId}`
   * i.e. patientEhrs-ehr123412341234-12, patients-ehr123412341234-e7b7cc8abb0-2039aa01
   */
  extRef?: string;
  emailAddress?: string;
  mobileNumber?: string;
  [key: string]: unknown;
}

/**
 * Base error class for Next Practice custom errors
 * This allows people to append optional contact information
 * when throwing the error
 */
export class NextBaseError extends Error {
  public errorInfo?: IErrorInfo;

  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m);

    if (errorInfo) {
      this.errorInfo = errorInfo;
    }
  }
}
/**
 * not found error class
 */
export class NotFoundError extends NextBaseError {
  /**
   * constructor
   *
   * @param {string} m
   */
  constructor(m: string = "Not found", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

/**
 * forbidden error class
 */
export class ForbiddenError extends NextBaseError {
  /**
   * constructor
   *
   * @param {string} m
   */
  constructor(m: string = "Forbidden", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

/**
 * unauthorized error class
 */
export class UnauthorizedError extends NextBaseError {
  /**
   * constructor
   *
   * @param {string} m
   */
  constructor(m: string = "Unauthorized", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

/**
 * Error thrown when it's relating to validation.
 * Due to it's current usage, this error type need to
 * accept string, object or array.
 */
export class ValidationError extends NextBaseError {
  public errorMessage: any;

  constructor(
    messageOrValidationErrors: string | unknown[] | Record<string, unknown>,
    errorInfo?: IErrorInfo,
  ) {
    if (typeof messageOrValidationErrors === "string") {
      super(messageOrValidationErrors, errorInfo);
      this.errorMessage = messageOrValidationErrors;
      return;
    }

    const stringifiedErrors = JSON.stringify(messageOrValidationErrors);
    const combinedInfo = {
      ...errorInfo,
      validationErrors: messageOrValidationErrors,
    };
    super(stringifiedErrors, combinedInfo);
    this.errorMessage = messageOrValidationErrors;
  }
}

export class InvalidCredentialsError extends NextBaseError {
  constructor(m: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class DuplicateEmailOnSignUpError extends NextBaseError {
  constructor(m: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}
export class NextNotFoundError extends NextBaseError {
  constructor(m: string = "Not found", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class NextForbiddenError extends NextBaseError {
  constructor(m: string = "Forbidden", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class NextUnauthorizedError extends NextBaseError {
  constructor(m: string = "Unauthorized", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class NextSessionInvalidatedError extends NextBaseError {
  constructor(m: string = "", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class NextSessionWeakPasswordError extends NextBaseError {
  constructor(m: string = "", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class NextLoginError extends NextBaseError {
  constructor(m: string = "", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class NextInvalidTwoFactorCodeError extends NextBaseError {
  constructor(m: string = "", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

// Generic error type with custom messages for onboard flow
// (see PatientAppModule onboard method for different messages)
export class NextOnboardError extends NextBaseError {
  constructor(m: string = "", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class NextInvalidAccessCodeError extends NextBaseError {
  constructor(m: string = "", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class NextNoActiveConsultError extends NextBaseError {
  constructor(m: string = "", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class NextAccountLinkError extends NextBaseError {
  constructor(m: string = "", errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

/**
 * Pronto error handling
 */
export class ProntoError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

/**
 * Socket error handling
 */
export class SocketPermissionDenied extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

/**
 * Session error handling
 */
export class SessionInvalidatedError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class SignInError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class PaymentError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class InvalidEhrIdError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class UnrecognisedFhirResourceError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class UnrecognisedFhirObservationError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class LocationNotFound extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class MultiplePatientsFoundError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class BadRequestError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class MessageDeliveryError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class EhrLimitationError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

export class SerializationError extends NextBaseError {
  constructor(m?: string, errorInfo?: IErrorInfo) {
    super(m, errorInfo);
  }
}

/**
 * Error to throw when the error is to do with a direct request from an EHR.
 * (i.e. Helix)
 */
export class EhrRequestError extends NextBaseError {
  public ehrKey: EEhrKey;
  public statusCode?: number;

  constructor(
    ehrKey: EEhrKey,
    message?: string,
    statusCode?: number,
    errorInfo?: IErrorInfo,
  );
  constructor(ehrKey: EEhrKey, message?: string, errorInfo?: IErrorInfo);
  constructor(
    ehrKey: EEhrKey,
    message?: string,
    statusCodeOrErrorInfo?: number | IErrorInfo,
    errorInfo?: IErrorInfo,
  ) {
    if (typeof statusCodeOrErrorInfo === "number") {
      super(message, errorInfo);
      this.statusCode = statusCodeOrErrorInfo;
    } else {
      super(message, statusCodeOrErrorInfo);
    }

    this.ehrKey = ehrKey;
  }
}

/**
 * Error associated with an EHR integration request. (i.e. ConnectEhrIntegration)
 */
export class EhrIntegrationRequestError extends NextBaseError {
  public driver: EEhrDriver;

  public statusCode?: number;

  constructor(
    driver: EEhrDriver,
    message?: string,
    statusCode?: number,
    errorInfo?: IErrorInfo,
  );
  constructor(driver: EEhrDriver, message?: string, errorInfo?: IErrorInfo);
  constructor(
    driver: EEhrDriver,
    message?: string,
    statusCodeOrInfo?: number | IErrorInfo,
    errorInfo?: IErrorInfo,
  ) {
    if (typeof statusCodeOrInfo === "number") {
      super(message, errorInfo);
      this.statusCode = statusCodeOrInfo;
    } else {
      super(message, statusCodeOrInfo);
    }

    this.driver = driver;
  }
}

/**
 * Error to throw when it's relating to a CMS request.
 * Please provide information like locationSlug, staff member slug etc. when throwing the error to provide
 * enough information for debugging
 */

export type TCmsRequestErrorResourceType =
  | "hcp"
  | "article"
  | "location"
  | "anatomy"
  | "terms"
  | "template"
  | "course"
  | "entry"
  | "task";
export class CmsRequestError extends NextBaseError {
  public resourceType: TCmsRequestErrorResourceType;

  constructor(
    resourceType: TCmsRequestErrorResourceType,
    message?: string,
    errorInfo?: IErrorInfo,
  ) {
    super(message, errorInfo);
    this.resourceType = resourceType;
  }
}

/**
 * Error throw when the enum, constants is not a supported type
 */
export class UnsupportedTypeError extends NextBaseError {
  constructor(message?: string, errorInfo?: IErrorInfo) {
    super(message, errorInfo);
  }
}

/**
 * Thrown when the error is not implemented
 */
export class NotImplementedError extends NextBaseError {
  constructor(message?: string, errorInfo?: IErrorInfo) {
    super(message || "Not Implemented", errorInfo);
  }
}

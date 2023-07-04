import * as uuid from "uuid";

export interface IEmailRowOptions {
  variant?: "primary";
  id?: string;
}

const defaultOptions: IEmailRowOptions = {
  variant: null,
  id: null,
};

export const baseRow = (body: string, options?: IEmailRowOptions) => {
  options = { ...defaultOptions, ...options };
  return `
<tr>
  <td valign="top" id="${options.id || uuid.v4()}" style="
        background: ${
          options.variant === "primary" ? "#006e63" : "#transparent"
        } none no-repeat center/cover;
        background-color: ${
          options.variant === "primary" ? "#006e63" : "#transparent"
        };
        mso-line-height-rule: exactly;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        background-image: none;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-top: 0;
        border-bottom: 0;
      ">
    ${body}
  </td>
</tr>
<tr>
  <td style="padding-bottom: 10px"></td>
</tr>`;
};

import { PayloadAction } from "@reduxjs/toolkit";

export type Payload<T, RT> = T & {
  returnValue?: RT; // Return value
};
export type PayloadActionRtData<T = Object, RT = any> = PayloadAction<
  Payload<T, RT>
>;

import React, { useState } from "react";
import Form from "../../form/Form";
import {
  BaseProps,
  LayoutComponentProps,
  RuledLayoutComponentProps,
  ValueableProps,
} from "../../types";

export type UseFormValidatorProps = {
  formRef: React.RefObject<typeof Form>;
};

export type UseFormValidator = {
  validate: () => boolean;
  valid: boolean;
};

export default function useFormValidator(
  props: LayoutComponentProps<
    UseFormValidatorProps & {
      current: {
        props: {
          children: any[];
        };
      };
    }
  >,
): UseFormValidator {
  //const [valid, setValid] = useState<boolean>(false);
  let valid = false;
  function validate(): boolean {
    console.log;
    if (props.current.props.children === undefined) {
      return false;
    }
    const elements = props.current.props.children as React.ReactElement[];
    console.log("elements");
    for (const element of elements) {
      if (
        (element.props as RuledLayoutComponentProps<ValueableProps<string>>)
          .rules !== undefined
      ) {
        /*const value = (
          element.props as RuledLayoutComponentProps<
            ValueableProps<string>
          >
        ).value();*/
        element.props.value = () => {
          return "";
        };
        console.log(JSON.stringify(element.props));
        const value = "";
        alert("value::::" + value);
      }
    }
    return true;
  }

  return {
    validate,
    valid,
  };
}

/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Solution } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SolutionUpdateFormInputValues = {
    title?: string;
    repo?: string;
    services?: string[];
    iac?: string[];
    description?: string;
    generalization?: string;
    category?: string[];
    owner?: string;
    language?: string[];
};
export declare type SolutionUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    repo?: ValidationFunction<string>;
    services?: ValidationFunction<string>;
    iac?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    generalization?: ValidationFunction<string>;
    category?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    language?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SolutionUpdateFormOverridesProps = {
    SolutionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    repo?: PrimitiveOverrideProps<TextFieldProps>;
    services?: PrimitiveOverrideProps<TextFieldProps>;
    iac?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    generalization?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    language?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SolutionUpdateFormProps = React.PropsWithChildren<{
    overrides?: SolutionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    solution?: Solution;
    onSubmit?: (fields: SolutionUpdateFormInputValues) => SolutionUpdateFormInputValues;
    onSuccess?: (fields: SolutionUpdateFormInputValues) => void;
    onError?: (fields: SolutionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SolutionUpdateFormInputValues) => SolutionUpdateFormInputValues;
    onValidate?: SolutionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SolutionUpdateForm(props: SolutionUpdateFormProps): React.ReactElement;

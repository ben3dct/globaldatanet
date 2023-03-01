/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SolutionCreateFormInputValues = {
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
export declare type SolutionCreateFormValidationValues = {
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
export declare type SolutionCreateFormOverridesProps = {
    SolutionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    repo?: PrimitiveOverrideProps<TextFieldProps>;
    services?: PrimitiveOverrideProps<TextFieldProps>;
    iac?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    generalization?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    language?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SolutionCreateFormProps = React.PropsWithChildren<{
    overrides?: SolutionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SolutionCreateFormInputValues) => SolutionCreateFormInputValues;
    onSuccess?: (fields: SolutionCreateFormInputValues) => void;
    onError?: (fields: SolutionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SolutionCreateFormInputValues) => SolutionCreateFormInputValues;
    onValidate?: SolutionCreateFormValidationValues;
} & React.CSSProperties>;
export default function SolutionCreateForm(props: SolutionCreateFormProps): React.ReactElement;

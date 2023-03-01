/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Solution } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function SolutionUpdateForm(props) {
  const {
    id: idProp,
    solution,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    repo: "",
    services: [],
    iac: [],
    description: "",
    generalization: "",
    category: [],
    owner: "",
    language: [],
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [repo, setRepo] = React.useState(initialValues.repo);
  const [services, setServices] = React.useState(initialValues.services);
  const [iac, setIac] = React.useState(initialValues.iac);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [generalization, setGeneralization] = React.useState(
    initialValues.generalization
  );
  const [category, setCategory] = React.useState(initialValues.category);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [language, setLanguage] = React.useState(initialValues.language);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = solutionRecord
      ? { ...initialValues, ...solutionRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setRepo(cleanValues.repo);
    setServices(cleanValues.services ?? []);
    setCurrentServicesValue("");
    setIac(cleanValues.iac ?? []);
    setCurrentIacValue("");
    setDescription(cleanValues.description);
    setGeneralization(cleanValues.generalization);
    setCategory(cleanValues.category ?? []);
    setCurrentCategoryValue(undefined);
    setOwner(cleanValues.owner);
    setLanguage(cleanValues.language ?? []);
    setCurrentLanguageValue("");
    setErrors({});
  };
  const [solutionRecord, setSolutionRecord] = React.useState(solution);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Solution, idProp)
        : solution;
      setSolutionRecord(record);
    };
    queryData();
  }, [idProp, solution]);
  React.useEffect(resetStateValues, [solutionRecord]);
  const [currentServicesValue, setCurrentServicesValue] = React.useState("");
  const servicesRef = React.createRef();
  const [currentIacValue, setCurrentIacValue] = React.useState("");
  const iacRef = React.createRef();
  const [currentCategoryValue, setCurrentCategoryValue] =
    React.useState(undefined);
  const categoryRef = React.createRef();
  const [currentLanguageValue, setCurrentLanguageValue] = React.useState("");
  const languageRef = React.createRef();
  const getDisplayValue = {
    category: (r) => {
      const enumDisplayValueMap = {
        GOVERNANCE: "Governance",
        DEVOPS: "Devops",
        CONTAINERS: "Containers",
        SERVERLESS: "Serverless",
        MIGRATION: "Migration",
        NETWORKING: "Networking",
        SECURITY: "Security",
        STORAGE: "Storage",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    title: [],
    repo: [],
    services: [],
    iac: [],
    description: [],
    generalization: [],
    category: [],
    owner: [],
    language: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          repo,
          services,
          iac,
          description,
          generalization,
          category,
          owner,
          language,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Solution.copyOf(solutionRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SolutionUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              repo,
              services,
              iac,
              description,
              generalization,
              category,
              owner,
              language,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Repo"
        isRequired={false}
        isReadOnly={false}
        value={repo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              repo: value,
              services,
              iac,
              description,
              generalization,
              category,
              owner,
              language,
            };
            const result = onChange(modelFields);
            value = result?.repo ?? value;
          }
          if (errors.repo?.hasError) {
            runValidationTasks("repo", value);
          }
          setRepo(value);
        }}
        onBlur={() => runValidationTasks("repo", repo)}
        errorMessage={errors.repo?.errorMessage}
        hasError={errors.repo?.hasError}
        {...getOverrideProps(overrides, "repo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              repo,
              services: values,
              iac,
              description,
              generalization,
              category,
              owner,
              language,
            };
            const result = onChange(modelFields);
            values = result?.services ?? values;
          }
          setServices(values);
          setCurrentServicesValue("");
        }}
        currentFieldValue={currentServicesValue}
        label={"Services"}
        items={services}
        hasError={errors.services?.hasError}
        setFieldValue={setCurrentServicesValue}
        inputFieldRef={servicesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Services"
          isRequired={false}
          isReadOnly={false}
          value={currentServicesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.services?.hasError) {
              runValidationTasks("services", value);
            }
            setCurrentServicesValue(value);
          }}
          onBlur={() => runValidationTasks("services", currentServicesValue)}
          errorMessage={errors.services?.errorMessage}
          hasError={errors.services?.hasError}
          ref={servicesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "services")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              repo,
              services,
              iac: values,
              description,
              generalization,
              category,
              owner,
              language,
            };
            const result = onChange(modelFields);
            values = result?.iac ?? values;
          }
          setIac(values);
          setCurrentIacValue("");
        }}
        currentFieldValue={currentIacValue}
        label={"Iac"}
        items={iac}
        hasError={errors.iac?.hasError}
        setFieldValue={setCurrentIacValue}
        inputFieldRef={iacRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Iac"
          isRequired={false}
          isReadOnly={false}
          value={currentIacValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.iac?.hasError) {
              runValidationTasks("iac", value);
            }
            setCurrentIacValue(value);
          }}
          onBlur={() => runValidationTasks("iac", currentIacValue)}
          errorMessage={errors.iac?.errorMessage}
          hasError={errors.iac?.hasError}
          ref={iacRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "iac")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              repo,
              services,
              iac,
              description: value,
              generalization,
              category,
              owner,
              language,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Generalization"
        isRequired={false}
        isReadOnly={false}
        value={generalization}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              repo,
              services,
              iac,
              description,
              generalization: value,
              category,
              owner,
              language,
            };
            const result = onChange(modelFields);
            value = result?.generalization ?? value;
          }
          if (errors.generalization?.hasError) {
            runValidationTasks("generalization", value);
          }
          setGeneralization(value);
        }}
        onBlur={() => runValidationTasks("generalization", generalization)}
        errorMessage={errors.generalization?.errorMessage}
        hasError={errors.generalization?.hasError}
        {...getOverrideProps(overrides, "generalization")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              repo,
              services,
              iac,
              description,
              generalization,
              category: values,
              owner,
              language,
            };
            const result = onChange(modelFields);
            values = result?.category ?? values;
          }
          setCategory(values);
          setCurrentCategoryValue(undefined);
        }}
        currentFieldValue={currentCategoryValue}
        label={"Category"}
        items={category}
        hasError={errors.category?.hasError}
        getBadgeText={getDisplayValue.category}
        setFieldValue={setCurrentCategoryValue}
        inputFieldRef={categoryRef}
        defaultFieldValue={undefined}
      >
        <SelectField
          label="Category"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentCategoryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.category?.hasError) {
              runValidationTasks("category", value);
            }
            setCurrentCategoryValue(value);
          }}
          onBlur={() => runValidationTasks("category", currentCategoryValue)}
          errorMessage={errors.category?.errorMessage}
          hasError={errors.category?.hasError}
          ref={categoryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "category")}
        >
          <option
            children="Governance"
            value="GOVERNANCE"
            {...getOverrideProps(overrides, "categoryoption0")}
          ></option>
          <option
            children="Devops"
            value="DEVOPS"
            {...getOverrideProps(overrides, "categoryoption1")}
          ></option>
          <option
            children="Containers"
            value="CONTAINERS"
            {...getOverrideProps(overrides, "categoryoption2")}
          ></option>
          <option
            children="Serverless"
            value="SERVERLESS"
            {...getOverrideProps(overrides, "categoryoption3")}
          ></option>
          <option
            children="Migration"
            value="MIGRATION"
            {...getOverrideProps(overrides, "categoryoption4")}
          ></option>
          <option
            children="Networking"
            value="NETWORKING"
            {...getOverrideProps(overrides, "categoryoption5")}
          ></option>
          <option
            children="Security"
            value="SECURITY"
            {...getOverrideProps(overrides, "categoryoption6")}
          ></option>
          <option
            children="Storage"
            value="STORAGE"
            {...getOverrideProps(overrides, "categoryoption7")}
          ></option>
        </SelectField>
      </ArrayField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              repo,
              services,
              iac,
              description,
              generalization,
              category,
              owner: value,
              language,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              repo,
              services,
              iac,
              description,
              generalization,
              category,
              owner,
              language: values,
            };
            const result = onChange(modelFields);
            values = result?.language ?? values;
          }
          setLanguage(values);
          setCurrentLanguageValue("");
        }}
        currentFieldValue={currentLanguageValue}
        label={"Language"}
        items={language}
        hasError={errors.language?.hasError}
        setFieldValue={setCurrentLanguageValue}
        inputFieldRef={languageRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Language"
          isRequired={false}
          isReadOnly={false}
          value={currentLanguageValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.language?.hasError) {
              runValidationTasks("language", value);
            }
            setCurrentLanguageValue(value);
          }}
          onBlur={() => runValidationTasks("language", currentLanguageValue)}
          errorMessage={errors.language?.errorMessage}
          hasError={errors.language?.hasError}
          ref={languageRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "language")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || solution)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || solution) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

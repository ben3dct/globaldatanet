/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAttachement = /* GraphQL */ `
  mutation CreateAttachement(
    $input: CreateAttachementInput!
    $condition: ModelAttachementConditionInput
  ) {
    createAttachement(input: $input, condition: $condition) {
      id
      name
      alt
      type
      link
      solutionID
      createdAt
      updatedAt
    }
  }
`;
export const updateAttachement = /* GraphQL */ `
  mutation UpdateAttachement(
    $input: UpdateAttachementInput!
    $condition: ModelAttachementConditionInput
  ) {
    updateAttachement(input: $input, condition: $condition) {
      id
      name
      alt
      type
      link
      solutionID
      createdAt
      updatedAt
    }
  }
`;
export const deleteAttachement = /* GraphQL */ `
  mutation DeleteAttachement(
    $input: DeleteAttachementInput!
    $condition: ModelAttachementConditionInput
  ) {
    deleteAttachement(input: $input, condition: $condition) {
      id
      name
      alt
      type
      link
      solutionID
      createdAt
      updatedAt
    }
  }
`;
export const createFeature = /* GraphQL */ `
  mutation CreateFeature(
    $input: CreateFeatureInput!
    $condition: ModelFeatureConditionInput
  ) {
    createFeature(input: $input, condition: $condition) {
      id
      solutionID
      name
      status
      assignee
      createdAt
      updatedAt
    }
  }
`;
export const updateFeature = /* GraphQL */ `
  mutation UpdateFeature(
    $input: UpdateFeatureInput!
    $condition: ModelFeatureConditionInput
  ) {
    updateFeature(input: $input, condition: $condition) {
      id
      solutionID
      name
      status
      assignee
      createdAt
      updatedAt
    }
  }
`;
export const deleteFeature = /* GraphQL */ `
  mutation DeleteFeature(
    $input: DeleteFeatureInput!
    $condition: ModelFeatureConditionInput
  ) {
    deleteFeature(input: $input, condition: $condition) {
      id
      solutionID
      name
      status
      assignee
      createdAt
      updatedAt
    }
  }
`;
export const createSolution = /* GraphQL */ `
  mutation CreateSolution(
    $input: CreateSolutionInput!
    $condition: ModelSolutionConditionInput
  ) {
    createSolution(input: $input, condition: $condition) {
      id
      title
      repo
      services
      iac
      Features {
        nextToken
      }
      description
      generalization
      category
      owner
      language
      Attachements {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSolution = /* GraphQL */ `
  mutation UpdateSolution(
    $input: UpdateSolutionInput!
    $condition: ModelSolutionConditionInput
  ) {
    updateSolution(input: $input, condition: $condition) {
      id
      title
      repo
      services
      iac
      Features {
        nextToken
      }
      description
      generalization
      category
      owner
      language
      Attachements {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSolution = /* GraphQL */ `
  mutation DeleteSolution(
    $input: DeleteSolutionInput!
    $condition: ModelSolutionConditionInput
  ) {
    deleteSolution(input: $input, condition: $condition) {
      id
      title
      repo
      services
      iac
      Features {
        nextToken
      }
      description
      generalization
      category
      owner
      language
      Attachements {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAttachement = /* GraphQL */ `
  subscription OnCreateAttachement(
    $filter: ModelSubscriptionAttachementFilterInput
  ) {
    onCreateAttachement(filter: $filter) {
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
export const onUpdateAttachement = /* GraphQL */ `
  subscription OnUpdateAttachement(
    $filter: ModelSubscriptionAttachementFilterInput
  ) {
    onUpdateAttachement(filter: $filter) {
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
export const onDeleteAttachement = /* GraphQL */ `
  subscription OnDeleteAttachement(
    $filter: ModelSubscriptionAttachementFilterInput
  ) {
    onDeleteAttachement(filter: $filter) {
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
export const onCreateFeature = /* GraphQL */ `
  subscription OnCreateFeature($filter: ModelSubscriptionFeatureFilterInput) {
    onCreateFeature(filter: $filter) {
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
export const onUpdateFeature = /* GraphQL */ `
  subscription OnUpdateFeature($filter: ModelSubscriptionFeatureFilterInput) {
    onUpdateFeature(filter: $filter) {
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
export const onDeleteFeature = /* GraphQL */ `
  subscription OnDeleteFeature($filter: ModelSubscriptionFeatureFilterInput) {
    onDeleteFeature(filter: $filter) {
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
export const onCreateSolution = /* GraphQL */ `
  subscription OnCreateSolution($filter: ModelSubscriptionSolutionFilterInput) {
    onCreateSolution(filter: $filter) {
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
export const onUpdateSolution = /* GraphQL */ `
  subscription OnUpdateSolution($filter: ModelSubscriptionSolutionFilterInput) {
    onUpdateSolution(filter: $filter) {
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
export const onDeleteSolution = /* GraphQL */ `
  subscription OnDeleteSolution($filter: ModelSubscriptionSolutionFilterInput) {
    onDeleteSolution(filter: $filter) {
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

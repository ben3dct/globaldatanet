/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      attachments {
        id
        url
        type
      }
      Features {
        nextToken
      }
      description
      generalization
      category
      owner
      language
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
      attachments {
        id
        url
        type
      }
      Features {
        nextToken
      }
      description
      generalization
      category
      owner
      language
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
      attachments {
        id
        url
        type
      }
      Features {
        nextToken
      }
      description
      generalization
      category
      owner
      language
      createdAt
      updatedAt
    }
  }
`;

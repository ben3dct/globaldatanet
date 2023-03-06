/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAttachement = /* GraphQL */ `
  query GetAttachement($id: ID!) {
    getAttachement(id: $id) {
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
export const listAttachements = /* GraphQL */ `
  query ListAttachements(
    $filter: ModelAttachementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttachements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        alt
        type
        link
        solutionID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const attachementsBySolutionID = /* GraphQL */ `
  query AttachementsBySolutionID(
    $solutionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAttachementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    attachementsBySolutionID(
      solutionID: $solutionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        alt
        type
        link
        solutionID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFeature = /* GraphQL */ `
  query GetFeature($id: ID!) {
    getFeature(id: $id) {
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
export const listFeatures = /* GraphQL */ `
  query ListFeatures(
    $filter: ModelFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        solutionID
        name
        status
        assignee
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const featuresBySolutionID = /* GraphQL */ `
  query FeaturesBySolutionID(
    $solutionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    featuresBySolutionID(
      solutionID: $solutionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        solutionID
        name
        status
        assignee
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSolution = /* GraphQL */ `
  query GetSolution($id: ID!) {
    getSolution(id: $id) {
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
export const listSolutions = /* GraphQL */ `
  query ListSolutions(
    $filter: ModelSolutionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSolutions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        repo
        services
        iac
        description
        generalization
        category
        owner
        language
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

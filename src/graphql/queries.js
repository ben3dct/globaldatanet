/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFeature = /* GraphQL */ `
  query GetFeature($id: ID!) {
    getFeature(id: $id) {
      id
      solutionID
      name
      status
      assignee {
        id
        email
      }
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GameFragment
// ====================================================

export interface GameFragment_cover {
  __typename: "UploadFile";
  url: string;
}

export interface GameFragment_developers {
  __typename: "Developer";
  name: string;
}

export interface GameFragment {
  __typename: "Game";
  id: string;
  slug: string;
  name: string;
  cover: GameFragment_cover | null;
  developers: GameFragment_developers[];
  price: number;
}

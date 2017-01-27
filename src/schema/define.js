// import GraphQLToolsTypes from "graphql-tools-types"

const Query = `
type Query {
  hello: String
  project(id: ID!): Project
  company(id: ID!): Company
  user(id: ID!): User
}
`;

const Mutation = `
type Mutation {
  createCompany(input: CompanyInput): Company
  updateCompany(id: ID!, input: CompanyInput): Company
}
`;

// type, union ----

const Company = `
type Company {
  id: ID!
  name: String!
  phoneNumber: String
  adminId: Int
  admin: User
}
`;

const User = `
type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  name: String
  companyId: Int
  company: Company
}
`;

const Project = `
type Project {
  id: ID!
  companyId: Int
  status: ProjectStatus
  title: String
  access: Access
  owner: User
  members: [User]
  tags: [Tag]
  pins: [Node]
  files: [Node]
  nodes: [Node]
}
`;

const Access = `
type Access {
  policy: AccessPolicy
  allowed: [User]
}
`;

const Tag = `
type Tag {
  id: ID
  name: String
}
`;

const Like = `
type Like {
  count: Int
  byMe: Boolean
}
`;

const Node = `
type Node {
  type: NodeType
  timestamp: Date
  payload: NodeBody
  nodes: [Node]
}
`;

const NodeBody = `
union NodeBody = TextPost | FilePost | StatusLog | TagLog | MemberLog | PostLog
`;

const TextPost = `
type TextPost {
  id: Int
  author: User
  like: Like
  title: String
  body: String
}
`;

const FilePost = `
type FilePost {
  id: Int
  author: User
  like: Like
  title: String
  body: String
  filename: String
  url: String
}
`;

const StatusLog = `
type StatusLog {
  doer: User
  status: ProjectStatus
}
`;

const TagLog = `
type TagLog {
  doer: User
  tag: Tag
}
`;

const MemberLog = `
type MemberLog {
  doer: User
  member: User
}
`;

const Post = `
union Post = TextPost | FilePost
`;

const PostLog = `
type PostLog {
  doer: User
  post: Post
}
`;

// input -----

const CompanyInput = `
input CompanyInput {
  companyName: String
  phoneNumber: String
  admin: UserInput
}
`;

const UserInput = `
input UserInput {
  firstName: String
  lastName: String
  email: String
}
`;

// enum -----

const ProjectStatus = `
enum ProjectStatus {
  PENDING
  IN_PROGRESS
  DONE
}
`;

const AccessPolicy = `
enum AccessPolicy {
  PUBLIC
  PRIVATE
}
`;

const NodeType = `
enum NodeType {
  POST_TEXT
  POST_FILE
  POST_IMAGE
  COMMENT_TEXT
  COMMENT_FILE
  COMMENT_IMAGE
  LOG_STATUS_UPDATE
  LOG_TAG_ADD
  LOG_TAG_REMOVE
  LOG_MEMBER_ADD
  LOG_MEMBER_REMOVE
  LOG_POST_UPDATE
  LOG_POST_REMOVE
}
`;

export const typeDefs = [
  Query,
  Mutation,
  // type, union ---
  Company,
  User,
  Project,
  Access,
  Tag,
  Like,
  Node,
  NodeBody,
  TextPost,
  FilePost,
  StatusLog,
  TagLog,
  MemberLog,
  Post,
  PostLog,
  // input ---
  CompanyInput,
  UserInput,
  // enum ---
  ProjectStatus,
  AccessPolicy,
  NodeType,
`
schema {
  query: Query,
  mutation: Mutation
}

scalar Date

# union Post = TextPost | FilePost
# union Log = StatusLog | TagLog | MemberLog | PostLog
# union NodeBody = Post | Log  # union の union はできない

type __NodeBody {
  id: ID
  author: User
  title: String
  body: String
  filename: String
  url: String
  doer: User
  status: ProjectStatus
  tag: Tag
  member: User
  post: NodeBody
  like: Like
}
`];

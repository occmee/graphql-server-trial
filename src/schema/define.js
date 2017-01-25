
export const typeDefs = [`

schema {
  query: Query,
  mutation: Mutation
}

scalar Date

enum ProjectStatus {
  PENDING
  IN_PROGRESS
  DONE
}

enum AccessPolicy {
  PUBLIC
  PRIVATE
}

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

type Query {
  hello: String
  project(id: ID!): Project
  company(id: ID!): Company
  user(id: ID!): User
}

type Mutation {
  createCompany(input: CompanyInput): Company
  updateCompany(id: ID!, input: CompanyInput): Company
}

input CompanyInput {
  companyName: String
  phoneNumber: String
  admin: UserInput
}

input UserInput {
  firstName: String
  lastName: String
  email: String
}

type Company {
  id: ID!
  name: String!
  phoneNumber: String
  adminId: Int
  admin: User
}

type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  name: String
  companyId: Int
  company: Company
}

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

type Access {
  policy: AccessPolicy
  allowed: [User]
}

type Tag {
  id: ID
  name: String
}

type Like {
  count: Int
  byMe: Boolean
}

type Node {
  type: NodeType
  timestamp: Date
  payload: NodeBody
  nodes: [Node]
}

# union Post = TextPost | FilePost
# union Log = StatusLog | TagLog | MemberLog | PostLog
# union NodeBody = Post | Log  # union の union はできない

union NodeBody = TextPost | FilePost | StatusLog | TagLog | MemberLog | PostLog

type TextPost {
  id: Int
  author: User
  like: Like
  title: String
  body: String
}

type FilePost {
  id: Int
  author: User
  like: Like
  title: String
  body: String
  filename: String
  url: String
}

type StatusLog {
  doer: User
  status: ProjectStatus
}

type TagLog {
  doer: User
  tag: Tag
}

type MemberLog {
  doer: User
  member: User
}

union Post = TextPost | FilePost
type PostLog {
  doer: User
  post: Post
}


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

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import GraphQLToolsTypes from "graphql-tools-types"

var Query = "\ntype Query {\n  hello: String\n  project(id: ID!): Project\n  company(id: ID!): Company\n  user(id: ID!): User\n}\n";

var Mutation = "\ntype Mutation {\n  createCompany(input: CompanyInput): Company\n  updateCompany(id: ID!, input: CompanyInput): Company\n}\n";

// type, union ----

var Company = "\ntype Company {\n  id: ID!\n  name: String!\n  phoneNumber: String\n  adminId: Int\n  admin: User\n}\n";

var User = "\ntype User {\n  id: ID!\n  firstName: String\n  lastName: String\n  email: String\n  name: String\n  companyId: Int\n  company: Company\n}\n";

var Project = "\ntype Project {\n  id: ID!\n  companyId: Int\n  status: ProjectStatus\n  title: String\n  access: Access\n  owner: User\n  members: [User]\n  tags: [Tag]\n  pins: [Node]\n  files: [Node]\n  nodes: [Node]\n}\n";

var Access = "\ntype Access {\n  policy: AccessPolicy\n  allowed: [User]\n}\n";

var Tag = "\ntype Tag {\n  id: ID\n  name: String\n}\n";

var Like = "\ntype Like {\n  count: Int\n  byMe: Boolean\n}\n";

var Node = "\ninterface Node {\n  type: NodeType\n  timestamp: Date\n  nodes: [Node]\n  payload: NodePayload\n}\ninterface NodePayload {\n  type: NodeType\n}\n";

var TextPost = "\ntype TextPost implements Node {\n  type: NodeType\n  timestamp: Date\n  nodes: [Node]\n  payload: TextPostPayload\n}\ntype TextPostPayload implements NodePayload {\n  type: NodeType\n  id: Int\n  author: User\n  like: Like\n  title: String\n  body: String\n}\n";

var FilePost = "\ntype FilePost implements Node {\n  type: NodeType\n  timestamp: Date\n  nodes: [Node]\n  payload: FilePostPayload\n}\ntype FilePostPayload implements NodePayload {\n  type: NodeType\n  id: Int\n  author: User\n  like: Like\n  title: String\n  body: String\n  filename: String\n  url: String\n}\n";

var StatusLog = "\ntype StatusLog implements Node {\n  type: NodeType\n  timestamp: Date\n  nodes: [Node]\n  payload: StatusLogPayload\n}\ntype StatusLogPayload implements NodePayload {\n  type: NodeType\n  doer: User\n  status: ProjectStatus\n}\n";

var TagLog = "\ntype TagLog implements Node {\n  type: NodeType\n  timestamp: Date\n  nodes: [Node]\n  payload: TagLogPayload\n}\ntype TagLogPayload implements NodePayload {\n  type: NodeType\n  doer: User\n  tag: Tag\n}\n";

var MemberLog = "\ntype MemberLog implements Node {\n  type: NodeType\n  timestamp: Date\n  nodes: [Node]\n  payload: MemberLogPayload\n}\ntype MemberLogPayload implements NodePayload {\n  type: NodeType\n  doer: User\n  member: User\n}\n";

var Post = "\nunion Post = TextPost | FilePost\n";

var PostLog = "\ntype PostLog implements Node {\n  type: NodeType\n  timestamp: Date\n  nodes: [Node]\n  payload: PostLogPayload\n}\ntype PostLogPayload implements NodePayload {\n  type: NodeType\n  doer: User\n  post: Post\n}\n";

// input -----

var CompanyInput = "\ninput CompanyInput {\n  companyName: String\n  phoneNumber: String\n  admin: UserInput\n}\n";

var UserInput = "\ninput UserInput {\n  firstName: String\n  lastName: String\n  email: String\n}\n";

// enum -----

var ProjectStatus = "\nenum ProjectStatus {\n  PENDING\n  IN_PROGRESS\n  DONE\n}\n";

var AccessPolicy = "\nenum AccessPolicy {\n  PUBLIC\n  PRIVATE\n}\n";

var NodeType = "\nenum NodeType {\n  POST_TEXT\n  POST_FILE\n  POST_IMAGE\n  COMMENT_TEXT\n  COMMENT_FILE\n  COMMENT_IMAGE\n  LOG_STATUS_UPDATE\n  LOG_TAG_ADD\n  LOG_TAG_REMOVE\n  LOG_MEMBER_ADD\n  LOG_MEMBER_REMOVE\n  LOG_POST_UPDATE\n  LOG_POST_REMOVE\n}\n";

var typeDefs = exports.typeDefs = [Query, Mutation,
// type, union ---
Company, User, Project, Access, Tag, Like, Node, TextPost, FilePost, StatusLog, TagLog, MemberLog, Post, PostLog,
// input ---
CompanyInput, UserInput,
// enum ---
ProjectStatus, AccessPolicy, NodeType, "\nschema {\n  query: Query\n  mutation: Mutation\n}\n\nscalar Date\n\n# union Post = TextPost | FilePost\n# union Log = StatusLog | TagLog | MemberLog | PostLog\n# union NodeBody = Post | Log  # union \u306E union \u306F\u3067\u304D\u306A\u3044\n\ntype __NodeBody {\n  id: ID\n  author: User\n  title: String\n  body: String\n  filename: String\n  url: String\n  doer: User\n  status: ProjectStatus\n  tag: Tag\n  member: User\n# post: NodeBody\n  like: Like\n}\n"];

exports.Node = Node;
exports.TextPost = TextPost;
exports.FilePost = FilePost;
exports.StatusLog = StatusLog;
exports.TagLog = TagLog;
exports.MemberLog = MemberLog;
exports.PostLog = PostLog;
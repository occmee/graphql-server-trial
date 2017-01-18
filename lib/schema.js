'use strict';

var _graphqlTools = require('graphql-tools');

var typeDefs = ['\n\nscalar Date\n\nenum ProjectStatus {\n  PENDING\n  IN_PROGRESS\n  DONE\n}\n\nenum AccessPolicy {\n  PUBLIC\n  PRIVATE\n}\n\nenum NodeType {\n  POST_TEXT\n  POST_FILE\n  POST_IMAGE\n  COMMENT_TEXT\n  COMMENT_FILE\n  COMMENT_IMAGE\n  LOG_STATUS_UPDATE\n  LOG_TAG_ADD\n  LOG_TAG_REMOVE\n  LOG_MEMBER_ADD\n  LOG_MEMBER_REMOVE\n  LOG_POST_UPDATE\n  LOG_POST_REMOVE\n}\n\ntype Query {\n  hello: String\n  project(id: ID!): Project\n}\n\ntype Project {\n  id: ID!\n  companyId: Int\n  status: ProjectStatus\n  title: String\n  access: Access\n  owner: User\n  members: [User]\n  tags: [Tag]\n  pins: [Node]\n  files: [Node]\n  nodes: [Node]\n}\n\ntype User {\n  id: ID!\n  name: String\n}\n\ntype Access {\n  policy: AccessPolicy\n  allowed: [User]\n}\n\ntype Tag {\n  id: ID\n  name: String\n}\n\ntype Like {\n  count: Int\n  byMe: Boolean\n}\n\ntype Node {\n  type: NodeType\n  timestamp: Date\n  payload: NodeBody\n  nodes: [Node]\n}\n\n# union Post = TextPost | FilePost\n# union Log = StatusLog | TagLog | MemberLog | PostLog\n# union NodeBody = Post | Log  # union \u306E union \u306F\u3067\u304D\u306A\u3044\n\nunion __NodeBody = TextPost | FilePost | StatusLog | TagLog | MemberLog | PostLog\n\ntype TextPost {\n  id: Int\n  author: User\n  like: Like\n  title: String\n  body: String\n}\n\ntype FilePost {\n  id: Int\n  author: User\n  like: Like\n  title: String\n  body: String\n  filename: String\n  url: String\n}\n\ntype StatusLog {\n  doer: User\n  status: ProjectStatus\n}\n\ntype TagLog {\n  doer: User\n  tag: Tag\n}\n\ntype MemberLog {\n  doer: User\n  member: User\n}\n\nunion Post = TextPost | FilePost\ntype PostLog {\n  doer: User\n  post: Post\n}\n\n\ntype NodeBody {\n  id: ID\n  author: User\n  title: String\n  body: String\n  filename: String\n  url: String\n  doer: User\n  status: ProjectStatus\n  tag: Tag\n  member: User\n  post: NodeBody\n  like: Like\n}\n\nschema {\n  query: Query\n}'];

/**

 type NodeBody {
  id: ID
  author: User
  title: String
  body: String
  filename: String
  url: String
  doer: User
  member: User
  post: NodeBody
  like: Like
}

 */

var resolvers = {
  Query: {
    hello: function hello(obj, args, context, info) {
      return 'world';
    },
    project: function project(obj, args, context, info) {
      return {
        id: args.id,
        title: "CRMの運用を改善する",
        status: "in_progress",
        owner: { // "このプロジェクトを作成した人",
          id: 1,
          name: "Taro"
        },
        access: {
          policy: "PRIVATE", // 'public'（誰でも見れる） / 'private'（allowed に登録されているユーザだけ見れる）",
          allowed: [{
            id: 1,
            name: "Taro"
          }, {
            id: 2,
            name: "Hanako"
          }, {
            id: 3,
            name: "Jiro"
          }, {
            id: 4,
            name: "Saburo"
          }, {
            id: 5,
            name: "Shiro"
          }]
        },
        tags: [{
          id: 1,
          name: "SECOND"
        }, {
          id: 2,
          name: "スマメン"
        }],
        members: [{
          id: 1,
          name: "Taro"
        }, {
          id: 2,
          name: "Hanako"
        }],
        pins: [{
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "POST_TEXT",
          payload: {
            id: 1,
            author: {
              id: 1,
              name: "Taro"
            },
            title: "投稿１",
            body: "テキストのポストです"
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "POST_FILE",
          payload: {
            id: 9,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.pdf",
            url: "http://hoge.com/xxxx.pdf"
          }
        }],
        files: [{
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "POST_FILE",
          payload: {
            id: 9,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.pdf",
            url: "http://hoge.com/xxxx.pdf"
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "POST_IMAGE",
          payload: {
            id: 5,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.jpeg",
            url: "http://hoge.com/xxxx.jpeg"
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "COMMENT_IMAGE",
          payload: {
            id: 3,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.jpeg",
            url: "http://hoge.com/xxxx.jpeg"
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "COMMENT_FILE",
          payload: {
            id: 4,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.pdf",
            url: "http://hoge.com/xxxx.pdf"
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "COMMENT_IMAGE",
          payload: {
            id: 7,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.jpeg",
            url: "http://hoge.com/xxxx.jpeg"
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "COMMENT_FILE",
          payload: {
            id: 8,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.pdf",
            url: "http://hoge.com/xxxx.pdf"
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "COMMENT_IMAGE",
          payload: {
            id: 11,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.jpeg",
            url: "http://hoge.com/xxxx.jpeg"
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "COMMENT_FILE",
          payload: {
            id: 12,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.pdf",
            url: "http://hoge.com/xxxx.pdf"
          }
        }],
        nodes: [{
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "POST_TEXT",
          payload: {
            id: 1,
            author: {
              id: 1,
              name: "Taro"
            },
            title: "投稿１",
            body: "テキストのポストです",
            like: {
              count: 3,
              byMe: true
            }
          },
          nodes: [{
            timestamp: "2016-08-15T02:02:06.000Z",
            type: "COMMENT_TEXT",
            payload: {
              id: 2,
              author: {
                id: 1,
                name: "Taro"
              },
              body: "投稿１に対するテキストコメント",
              like: {
                count: 0,
                byMe: false
              }
            }
          }, {
            timestamp: "2016-08-15T02:02:06.000Z",
            type: "COMMENT_IMAGE",
            payload: {
              id: 3,
              author: {
                id: 1,
                name: "Taro"
              },
              filename: "ファイル名.jpeg",
              url: "http://hoge.com/xxxx.jpeg",
              body: "投稿１に対する画像コメント",
              like: {
                count: 2,
                byMe: false
              }
            }
          }, {
            timestamp: "2016-08-15T02:02:06.000Z",
            type: "COMMENT_FILE",
            payload: {
              id: 4,
              author: {
                id: 1,
                name: "Taro"
              },
              filename: "ファイル名.pdf",
              url: "http://hoge.com/xxxx.pdf",
              body: "投稿１に対するファイルコメント",
              like: {
                count: 2,
                byMe: false
              }
            }
          }]
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "POST_IMAGE",
          payload: {
            id: 5,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.jpeg",
            url: "http://hoge.com/xxxx.jpeg",
            title: "画像１",
            body: "画像ファイルアップロードです",
            like: {
              count: 2,
              byMe: false
            }
          },
          nodes: [{
            timestamp: "2016-08-15T02:02:06.000Z",
            type: "COMMENT_TEXT",
            payload: {
              id: 6,
              author: {
                id: 1,
                name: "Taro"
              },
              body: "画像１に対するテキストコメント",
              like: {
                count: 0,
                byMe: false
              }
            }
          }, {
            timestamp: "2016-08-15T02:02:06.000Z",
            type: "COMMENT_IMAGE",
            payload: {
              id: 7,
              author: {
                id: 1,
                name: "Taro"
              },
              filename: "ファイル名.jpeg",
              url: "http://hoge.com/xxxx.jpeg",
              body: "画像１に対する画像コメント",
              like: {
                count: 2,
                byMe: false
              }
            }
          }, {
            timestamp: "2016-08-15T02:02:06.000Z",
            type: "COMMENT_FILE",
            payload: {
              id: 8,
              author: {
                id: 1,
                name: "Taro"
              },
              filename: "ファイル名.pdf",
              url: "http://hoge.com/xxxx.pdf",
              body: "画像１に対するファイルコメント",
              like: {
                count: 2,
                byMe: false
              }
            }
          }]
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "POST_FILE",
          payload: {
            id: 9,
            author: {
              id: 1,
              name: "Taro"
            },
            filename: "ファイル名.pdf",
            url: "http://hoge.com/xxxx.pdf",
            title: "ファイル１",
            body: "PDFファイルアップロードです",
            like: {
              count: 2,
              byMe: false
            }
          },
          nodes: [{
            timestamp: "2016-08-15T02:02:06.000Z",
            type: "COMMENT_TEXT",
            payload: {
              id: 10,
              author: {
                id: 1,
                name: "Taro"
              },
              body: "ファイル１に対するテキストコメント",
              like: {
                count: 0,
                byMe: false
              }
            }
          }, {
            timestamp: "2016-08-15T02:02:06.000Z",
            type: "COMMENT_IMAGE",
            payload: {
              id: 11,
              author: {
                id: 1,
                name: "Taro"
              },
              filename: "ファイル名.jpeg",
              url: "http://hoge.com/xxxx.jpeg",
              body: "ファイル１に対する画像コメント",
              like: {
                count: 2,
                byMe: false
              }
            }
          }, {
            timestamp: "2016-08-15T02:02:06.000Z",
            type: "COMMENT_FILE",
            payload: {
              id: 12,
              author: {
                id: 1,
                name: "Taro"
              },
              filename: "ファイル名.pdf",
              url: "http://hoge.com/xxxx.pdf",
              body: "ファイル１に対するファイルコメント",
              like: {
                count: 2,
                byMe: false
              }
            }
          }]
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "LOG_STATUS_UPDATE",
          payload: {
            doer: {
              id: 1,
              name: "Taro"
            },
            status: "in_progress"
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "LOG_TAG_ADD",
          payload: {
            doer: {
              id: 1,
              name: "Taro"
            },
            "tag": {
              id: 1,
              name: "SECOND"
            }
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "LOG_TAG_REMOVE",
          payload: {
            doer: {
              id: 1,
              name: "Taro"
            },
            "tag": {
              id: 1,
              name: "SECOND"
            }
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "LOG_MEMBER_ADD",
          payload: {
            doer: {
              id: 1,
              name: "Taro"
            },
            "member": {
              id: 2,
              name: "Hanako"
            }
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "LOG_MEMBER_REMOVE",
          payload: {
            doer: {
              id: 1,
              name: "Taro"
            },
            "member": {
              id: 2,
              name: "Hanako"
            }
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "LOG_POST_UPDATE",
          payload: {
            doer: {
              id: 1,
              name: "Taro"
            },
            post: {
              id: 1,
              title: "投稿１"
            }
          }
        }, {
          timestamp: "2016-08-15T02:02:06.000Z",
          type: "LOG_POST_REMOVE",
          payload: {
            doer: {
              id: 1,
              name: "Taro"
            },
            post: {
              id: 1,
              title: "投稿１"
            }
          }
        }],
        createdAt: "2016-08-15T02:02:06.000Z",
        updatedAt: "2016-08-15T02:02:06.000Z"
      };
    }
  }
};

var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers });

module.exports = {
  schema: schema
};
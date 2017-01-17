import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = [`

scalar Date

enum ProjectStatus {
  PENDING
  IN_PROGRESS
  DONE
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
  project: Project
}

type Project {
  id: ID!
  companyId: Int
  status: ProjectStatus
  title: String
  owner: [User]
  nodes: [Node]
}

type User {
  id: ID!
  name: String
}

type Node {
  type: NodeType
  timestamp: Date
  payload: NodeBody
  nodes: [Node]
}

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

type Like {
  count: Int
  byMe: Boolean
}

schema {
  query: Query
}`];

const resolvers = {
  Query: {
    hello(root) {
      return 'world';
    },

    project(root) {
      return {
        id: 1,
        title: "CRMの運用を改善する",
        status: "in_progress",
        owner: { // "このプロジェクトを作成した人",
          id: 1,
          name: "Taro"
        },
        access: {
          policy: "private", // 'public'（誰でも見れる） / 'private'（allowed に登録されているユーザだけ見れる）",
          allowed: [
            {
              id: 1,
              name: "Taro"
            },
            {
              id: 2,
              name: "Hanako"
            },
            {
              id: 3,
              name: "Jiro"
            },
            {
              id: 4,
              name: "Saburo"
            },
            {
              id: 5,
              name: "Shiro"
            }
          ]
        },
        tags: [
          {
            id: 1,
            name: "SECOND"
          },
          {
            id: 2,
            name: "スマメン"
          }
        ],
        members: [
          {
            id: 1,
            name: "Taro"
          },
          {
            id: 2,
            name: "Hanako"
          }
        ],
        pins: [
          {
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
          },
          {
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
          }
        ],
        files: [
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          }
        ],
        nodes: [
          {
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
            nodes: [
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          },
          {
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
            nodes: [
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          },
          {
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
            nodes: [
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          },
          {
            timestamp: "2016-08-15T02:02:06.000Z",
            type: "LOG_STATUS_UPDATE",
            payload: {
              doer: {
                id: 1,
                name: "Taro"
              },
              status: "in_progress"
            }
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          }
        ],
        createdAt: "2016-08-15T02:02:06.000Z",
        updatedAt: "2016-08-15T02:02:06.000Z"
      };
    }
  }
};

const schema = makeExecutableSchema({typeDefs, resolvers});

module.exports = {
  schema
};
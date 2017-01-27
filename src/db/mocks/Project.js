export function project(id) {
  return {
    id: id,
    title: "CRMの運用を改善する",
    status: "in_progress",
    owner: { // "このプロジェクトを作成した人",
      id: 1,
      firstName: "Taro"
    },
    access: {
      policy: "PRIVATE", // 'public'（誰でも見れる） / 'private'（allowed に登録されているユーザだけ見れる）",
      allowed: [
        {
          id: 1,
          firstName: "Taro"
        },
        {
          id: 2,
          firstName: "Hanako"
        },
        {
          id: 3,
          firstName: "Jiro"
        },
        {
          id: 4,
          firstName: "Saburo"
        },
        {
          id: 5,
          firstName: "Shiro"
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
        firstName: "Taro"
      },
      {
        id: 2,
        firstName: "Hanako"
      }
    ],
    pins: [
      {
        timestamp: new Date(),
        type: "POST_TEXT",
        payload: {
          id: 1,
          author: {
            id: 1,
            firstName: "Taro"
          },
          title: "投稿１",
          body: "テキストのポストです"
        }
      },
      {
        timestamp: new Date(),
        type: "POST_FILE",
        payload: {
          id: 9,
          author: {
            id: 1,
            firstName: "Taro"
          },
          filename: "ファイル名.pdf",
          url: "http://hoge.com/xxxx.pdf"
        }
      }
    ],
    files: [
      {
        timestamp: new Date(),
        type: "POST_FILE",
        payload: {
          id: 9,
          author: {
            id: 1,
            firstName: "Taro"
          },
          filename: "ファイル名.pdf",
          url: "http://hoge.com/xxxx.pdf"
        }
      },
      {
        timestamp: new Date(),
        type: "POST_IMAGE",
        payload: {
          id: 5,
          author: {
            id: 1,
            firstName: "Taro"
          },
          filename: "ファイル名.jpeg",
          url: "http://hoge.com/xxxx.jpeg"
        }
      },
      {
        timestamp: new Date(),
        type: "COMMENT_IMAGE",
        payload: {
          id: 3,
          author: {
            id: 1,
            firstName: "Taro"
          },
          filename: "ファイル名.jpeg",
          url: "http://hoge.com/xxxx.jpeg"
        }
      },
      {
        timestamp: new Date(),
        type: "COMMENT_FILE",
        payload: {
          id: 4,
          author: {
            id: 1,
            firstName: "Taro"
          },
          filename: "ファイル名.pdf",
          url: "http://hoge.com/xxxx.pdf"
        }
      },
      {
        timestamp: new Date(),
        type: "COMMENT_IMAGE",
        payload: {
          id: 7,
          author: {
            id: 1,
            firstName: "Taro"
          },
          filename: "ファイル名.jpeg",
          url: "http://hoge.com/xxxx.jpeg"
        }
      },
      {
        timestamp: new Date(),
        type: "COMMENT_FILE",
        payload: {
          id: 8,
          author: {
            id: 1,
            firstName: "Taro"
          },
          filename: "ファイル名.pdf",
          url: "http://hoge.com/xxxx.pdf"
        }
      },
      {
        timestamp: new Date(),
        type: "COMMENT_IMAGE",
        payload: {
          id: 11,
          author: {
            id: 1,
            firstName: "Taro"
          },
          filename: "ファイル名.jpeg",
          url: "http://hoge.com/xxxx.jpeg"
        }
      },
      {
        timestamp: new Date(),
        type: "COMMENT_FILE",
        payload: {
          id: 12,
          author: {
            id: 1,
            firstName: "Taro"
          },
          filename: "ファイル名.pdf",
          url: "http://hoge.com/xxxx.pdf"
        }
      }
    ],
    nodes: [
      {
        timestamp: new Date(),
        type: "POST_TEXT",
        payload: {
          id: 1,
          author: {
            id: 1,
            firstName: "Taro"
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
            timestamp: new Date(),
            type: "COMMENT_TEXT",
            payload: {
              id: 2,
              author: {
                id: 1,
                firstName: "Taro"
              },
              body: "投稿１に対するテキストコメント",
              like: {
                count: 0,
                byMe: false
              }
            }
          },
          {
            timestamp: new Date(),
            type: "COMMENT_IMAGE",
            payload: {
              id: 3,
              author: {
                id: 1,
                firstName: "Taro"
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
            timestamp: new Date(),
            type: "COMMENT_FILE",
            payload: {
              id: 4,
              author: {
                id: 1,
                firstName: "Taro"
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
        timestamp: new Date(),
        type: "POST_IMAGE",
        payload: {
          id: 5,
          author: {
            id: 1,
            firstName: "Taro"
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
            timestamp: new Date(),
            type: "COMMENT_TEXT",
            payload: {
              id: 6,
              author: {
                id: 1,
                firstName: "Taro"
              },
              body: "画像１に対するテキストコメント",
              like: {
                count: 0,
                byMe: false
              }
            }
          },
          {
            timestamp: new Date(),
            type: "COMMENT_IMAGE",
            payload: {
              id: 7,
              author: {
                id: 1,
                firstName: "Taro"
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
            timestamp: new Date(),
            type: "COMMENT_FILE",
            payload: {
              id: 8,
              author: {
                id: 1,
                firstName: "Taro"
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
        timestamp: new Date(),
        type: "POST_FILE",
        payload: {
          id: 9,
          author: {
            id: 1,
            firstName: "Taro"
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
            timestamp: new Date(),
            type: "COMMENT_TEXT",
            payload: {
              id: 10,
              author: {
                id: 1,
                firstName: "Taro"
              },
              body: "ファイル１に対するテキストコメント",
              like: {
                count: 0,
                byMe: false
              }
            }
          },
          {
            timestamp: new Date(),
            type: "COMMENT_IMAGE",
            payload: {
              id: 11,
              author: {
                id: 1,
                firstName: "Taro"
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
            timestamp: new Date(),
            type: "COMMENT_FILE",
            payload: {
              id: 12,
              author: {
                id: 1,
                firstName: "Taro"
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
        timestamp: new Date(),
        type: "LOG_STATUS_UPDATE",
        payload: {
          doer: {
            id: 1,
            firstName: "Taro"
          },
          status: "in_progress"
        }
      },
      {
        timestamp: new Date(),
        type: "LOG_TAG_ADD",
        payload: {
          doer: {
            id: 1,
            firstName: "Taro"
          },
          "tag": {
            id: 1,
            name: "SECOND"
          }
        }
      },
      {
        timestamp: new Date(),
        type: "LOG_TAG_REMOVE",
        payload: {
          doer: {
            id: 1,
            firstName: "Taro"
          },
          "tag": {
            id: 1,
            name: "SECOND"
          }
        }
      },
      {
        timestamp: new Date(),
        type: "LOG_MEMBER_ADD",
        payload: {
          doer: {
            id: 1,
            firstName: "Taro"
          },
          "member": {
            id: 2,
            firstName: "Hanako"
          }
        }
      },
      {
        timestamp: new Date(),
        type: "LOG_MEMBER_REMOVE",
        payload: {
          doer: {
            id: 1,
            firstName: "Taro"
          },
          "member": {
            id: 2,
            firstName: "Hanako"
          }
        }
      },
      {
        timestamp: new Date(),
        type: "LOG_POST_UPDATE",
        payload: {
          doer: {
            id: 1,
            firstName: "Taro"
          },
          post: {
            id: 1,
            title: "投稿１"
          }
        }
      },
      {
        timestamp: new Date(),
        type: "LOG_POST_REMOVE",
        payload: {
          doer: {
            id: 1,
            firstName: "Taro"
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
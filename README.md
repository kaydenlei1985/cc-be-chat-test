# chat_server

## 服务器启动
    npm install

    npm run start

## 单元测试
    npm run test

## System design decisions

### Component

#### Filter 
    Filter组件是用来过滤脏字的，Filter组件会读取脏字文件到内存，在玩家消息转发之前处理过滤流程。

#### History
    History组件是用来保存最近历史信息，玩家登陆之后，可以通过History组件下发历史信息，History组件会在玩家发送消息时保存历史记录。

#### Popular
    Popular组件是记录当前热词信息， 

#### User
    User组件是用来维护玩家状态信息数据的组件，玩家上线之后会创建该对象，玩家下线之后会销毁。

#### ChatServer
    ChatServer是用来聊天服务器主流程管理模块，用来调度聊天服务器的业务流程。

## Scaling Concerns
    服务器的业务数据都保存在内存当中，如果服务器宕机，数据会丢失，应该使用redis或者mongodb将必要数据持久化。
    服务器单点部署，有单点故障的风险，生产环境需要在前端架设代理服务器，使用服务注册发现模式集群部署。

## NPM packages
    mocha 测试框架
    chai 测试框架
    ttl-mem-cache 热点数据存储
    node-uuid 用户名重复处理
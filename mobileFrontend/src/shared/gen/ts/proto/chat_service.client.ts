// @generated by protobuf-ts 2.9.4
// @generated from protobuf file "proto/chat_service.proto" (package "pb", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { ChatApiService } from "./chat_service";
import type { GetAllChatMessagesResponse } from "./chat_service";
import type { GetAllChatMessagesRequest } from "./chat_service";
import type { Empty } from "./utils";
import type { SendChatMessageRequest } from "./chat_service";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { StartChatResponse } from "./chat_service";
import type { StartChatRequest } from "./chat_service";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service pb.ChatApiService
 */
export interface IChatApiServiceClient {
  /**
   * Start chat with one or multiple users
   *
   * @generated from protobuf rpc: StartChat(pb.StartChatRequest) returns (pb.StartChatResponse);
   */
  startChat(
    input: StartChatRequest,
    options?: RpcOptions,
  ): UnaryCall<StartChatRequest, StartChatResponse>;
  /**
   * Send chat message to a chat room
   *
   * @generated from protobuf rpc: SendChatMessage(pb.SendChatMessageRequest) returns (pb.Empty);
   */
  sendChatMessage(
    input: SendChatMessageRequest,
    options?: RpcOptions,
  ): UnaryCall<SendChatMessageRequest, Empty>;
  /**
   * Load all chat messages
   *
   * @generated from protobuf rpc: getAllChatMessages(pb.GetAllChatMessagesRequest) returns (pb.GetAllChatMessagesResponse);
   */
  getAllChatMessages(
    input: GetAllChatMessagesRequest,
    options?: RpcOptions,
  ): UnaryCall<GetAllChatMessagesRequest, GetAllChatMessagesResponse>;
}
/**
 * @generated from protobuf service pb.ChatApiService
 */
export class ChatApiServiceClient
  implements IChatApiServiceClient, ServiceInfo
{
  typeName = ChatApiService.typeName;
  methods = ChatApiService.methods;
  options = ChatApiService.options;
  constructor(private readonly _transport: RpcTransport) {}
  /**
   * Start chat with one or multiple users
   *
   * @generated from protobuf rpc: StartChat(pb.StartChatRequest) returns (pb.StartChatResponse);
   */
  startChat(
    input: StartChatRequest,
    options?: RpcOptions,
  ): UnaryCall<StartChatRequest, StartChatResponse> {
    const method = this.methods[0],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<StartChatRequest, StartChatResponse>(
      "unary",
      this._transport,
      method,
      opt,
      input,
    );
  }
  /**
   * Send chat message to a chat room
   *
   * @generated from protobuf rpc: SendChatMessage(pb.SendChatMessageRequest) returns (pb.Empty);
   */
  sendChatMessage(
    input: SendChatMessageRequest,
    options?: RpcOptions,
  ): UnaryCall<SendChatMessageRequest, Empty> {
    const method = this.methods[1],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<SendChatMessageRequest, Empty>(
      "unary",
      this._transport,
      method,
      opt,
      input,
    );
  }
  /**
   * Load all chat messages
   *
   * @generated from protobuf rpc: getAllChatMessages(pb.GetAllChatMessagesRequest) returns (pb.GetAllChatMessagesResponse);
   */
  getAllChatMessages(
    input: GetAllChatMessagesRequest,
    options?: RpcOptions,
  ): UnaryCall<GetAllChatMessagesRequest, GetAllChatMessagesResponse> {
    const method = this.methods[2],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<
      GetAllChatMessagesRequest,
      GetAllChatMessagesResponse
    >("unary", this._transport, method, opt, input);
  }
}
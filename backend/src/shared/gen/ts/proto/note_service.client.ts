// @generated by protobuf-ts 2.9.4
// @generated from protobuf file "proto/note_service.proto" (package "pb", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { NoteApiService } from "./note_service";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { GetAllNotesResponse } from "./note_service";
import type { Empty } from "./utils";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service pb.NoteApiService
 */
export interface INoteApiServiceClient {
    /**
     * load all notes
     *
     * @generated from protobuf rpc: getAllNotes(pb.Empty) returns (pb.GetAllNotesResponse);
     */
    getAllNotes(input: Empty, options?: RpcOptions): UnaryCall<Empty, GetAllNotesResponse>;
}
/**
 * @generated from protobuf service pb.NoteApiService
 */
export class NoteApiServiceClient implements INoteApiServiceClient, ServiceInfo {
    typeName = NoteApiService.typeName;
    methods = NoteApiService.methods;
    options = NoteApiService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * load all notes
     *
     * @generated from protobuf rpc: getAllNotes(pb.Empty) returns (pb.GetAllNotesResponse);
     */
    getAllNotes(input: Empty, options?: RpcOptions): UnaryCall<Empty, GetAllNotesResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, GetAllNotesResponse>("unary", this._transport, method, opt, input);
    }
}

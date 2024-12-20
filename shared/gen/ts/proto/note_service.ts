// @generated by protobuf-ts 2.9.4
// @generated from protobuf file "proto/note_service.proto" (package "pb", syntax proto3)
// tslint:disable
import { Empty } from "./utils";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message pb.Note
 */
export interface Note {
    /**
     * @generated from protobuf field: int32 id = 1;
     */
    id: number;
    /**
     * @generated from protobuf field: string username = 2;
     */
    username: string;
    /**
     * @generated from protobuf field: string timestamp = 3;
     */
    timestamp: string;
    /**
     * @generated from protobuf field: string text = 4;
     */
    text: string;
}
/**
 * @generated from protobuf message pb.GetAllNotesResponse
 */
export interface GetAllNotesResponse {
    /**
     * @generated from protobuf field: repeated pb.Note notes = 1;
     */
    notes: Note[];
}
// @generated message type with reflection information, may provide speed optimized methods
class Note$Type extends MessageType<Note> {
    constructor() {
        super("pb.Note", [
            { no: 1, name: "id", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "timestamp", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "text", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Note>): Note {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.id = 0;
        message.username = "";
        message.timestamp = "";
        message.text = "";
        if (value !== undefined)
            reflectionMergePartial<Note>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Note): Note {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 id */ 1:
                    message.id = reader.int32();
                    break;
                case /* string username */ 2:
                    message.username = reader.string();
                    break;
                case /* string timestamp */ 3:
                    message.timestamp = reader.string();
                    break;
                case /* string text */ 4:
                    message.text = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Note, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).int32(message.id);
        /* string username = 2; */
        if (message.username !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.username);
        /* string timestamp = 3; */
        if (message.timestamp !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.timestamp);
        /* string text = 4; */
        if (message.text !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.text);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message pb.Note
 */
export const Note = new Note$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetAllNotesResponse$Type extends MessageType<GetAllNotesResponse> {
    constructor() {
        super("pb.GetAllNotesResponse", [
            { no: 1, name: "notes", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Note }
        ]);
    }
    create(value?: PartialMessage<GetAllNotesResponse>): GetAllNotesResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.notes = [];
        if (value !== undefined)
            reflectionMergePartial<GetAllNotesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetAllNotesResponse): GetAllNotesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated pb.Note notes */ 1:
                    message.notes.push(Note.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetAllNotesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated pb.Note notes = 1; */
        for (let i = 0; i < message.notes.length; i++)
            Note.internalBinaryWrite(message.notes[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message pb.GetAllNotesResponse
 */
export const GetAllNotesResponse = new GetAllNotesResponse$Type();
/**
 * @generated ServiceType for protobuf service pb.NoteApiService
 */
export const NoteApiService = new ServiceType("pb.NoteApiService", [
    { name: "getAllNotes", options: { "google.api.http": { get: "/api/v3/notes" } }, I: Empty, O: GetAllNotesResponse }
]);

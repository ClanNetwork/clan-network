// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: clan/claim/v1beta1/action_record.proto

package types

import (
	fmt "fmt"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type Action int32

const (
	ActionInitialClaim  Action = 0
	ActionVote          Action = 1
	ActionDelegateStake Action = 2
	TBD1                Action = 3
	TBD2                Action = 4
)

var Action_name = map[int32]string{
	0: "ActionInitialClaim",
	1: "ActionVote",
	2: "ActionDelegateStake",
	3: "TBD1",
	4: "TBD2",
}

var Action_value = map[string]int32{
	"ActionInitialClaim":  0,
	"ActionVote":          1,
	"ActionDelegateStake": 2,
	"TBD1":                3,
	"TBD2":                4,
}

func (x Action) String() string {
	return proto.EnumName(Action_name, int32(x))
}

func (Action) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_f1473b6da34f2d0c, []int{0}
}

type ActionRecord struct {
	// address of action user
	Address        string   `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty" yaml:"address"`
	ClaimAddresses []string `protobuf:"bytes,2,rep,name=claim_addresses,json=claimAddresses,proto3" json:"claim_addresses,omitempty" yaml:"claim_addresses"`
	// true if action is completed
	// index of bool in array refers to action enum #
	ActionCompleted []bool `protobuf:"varint,3,rep,packed,name=action_completed,json=actionCompleted,proto3" json:"action_completed,omitempty" yaml:"action_completed"`
}

func (m *ActionRecord) Reset()         { *m = ActionRecord{} }
func (m *ActionRecord) String() string { return proto.CompactTextString(m) }
func (*ActionRecord) ProtoMessage()    {}
func (*ActionRecord) Descriptor() ([]byte, []int) {
	return fileDescriptor_f1473b6da34f2d0c, []int{0}
}
func (m *ActionRecord) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *ActionRecord) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_ActionRecord.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *ActionRecord) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ActionRecord.Merge(m, src)
}
func (m *ActionRecord) XXX_Size() int {
	return m.Size()
}
func (m *ActionRecord) XXX_DiscardUnknown() {
	xxx_messageInfo_ActionRecord.DiscardUnknown(m)
}

var xxx_messageInfo_ActionRecord proto.InternalMessageInfo

func (m *ActionRecord) GetAddress() string {
	if m != nil {
		return m.Address
	}
	return ""
}

func (m *ActionRecord) GetClaimAddresses() []string {
	if m != nil {
		return m.ClaimAddresses
	}
	return nil
}

func (m *ActionRecord) GetActionCompleted() []bool {
	if m != nil {
		return m.ActionCompleted
	}
	return nil
}

func init() {
	proto.RegisterEnum("ClanNetwork.clannetwork.claim.v1beta1.Action", Action_name, Action_value)
	proto.RegisterType((*ActionRecord)(nil), "ClanNetwork.clannetwork.claim.v1beta1.ActionRecord")
}

func init() {
	proto.RegisterFile("clan/claim/v1beta1/action_record.proto", fileDescriptor_f1473b6da34f2d0c)
}

var fileDescriptor_f1473b6da34f2d0c = []byte{
	// 368 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x5c, 0x91, 0xcf, 0x6a, 0xea, 0x40,
	0x18, 0xc5, 0x33, 0x46, 0xbc, 0x3a, 0x5c, 0x34, 0xcc, 0xbd, 0xa8, 0xb8, 0x98, 0x48, 0xe0, 0x5e,
	0xa4, 0xb4, 0x09, 0x69, 0x77, 0xdd, 0x19, 0x85, 0xd2, 0x16, 0xba, 0x48, 0x4b, 0x17, 0xdd, 0xc8,
	0x98, 0x0c, 0x69, 0x30, 0xc9, 0x48, 0x32, 0xfd, 0xe3, 0x1b, 0x74, 0xd9, 0x77, 0xe8, 0xcb, 0xb8,
	0xb4, 0xbb, 0xae, 0x42, 0xd1, 0x37, 0xf0, 0x09, 0x4a, 0x32, 0x23, 0x2d, 0xee, 0x4e, 0x7e, 0x39,
	0xe7, 0xfb, 0xe6, 0xe3, 0xc0, 0xff, 0x5e, 0x44, 0x12, 0xcb, 0x8b, 0x48, 0x18, 0x5b, 0x8f, 0xf6,
	0x94, 0x72, 0x62, 0x5b, 0xc4, 0xe3, 0x21, 0x4b, 0x26, 0x29, 0xf5, 0x58, 0xea, 0x9b, 0xf3, 0x94,
	0x71, 0x86, 0xfe, 0x8d, 0x22, 0x92, 0x5c, 0x51, 0xfe, 0xc4, 0xd2, 0x99, 0x59, 0x64, 0x92, 0x6f,
	0x1d, 0xc6, 0xa6, 0x8c, 0xf6, 0xfe, 0x06, 0x2c, 0x60, 0x65, 0xc2, 0x2a, 0x94, 0x08, 0x1b, 0xef,
	0x00, 0xfe, 0x1e, 0x96, 0x43, 0xdd, 0x72, 0x26, 0x3a, 0x84, 0xbf, 0x88, 0xef, 0xa7, 0x34, 0xcb,
	0xba, 0xa0, 0x0f, 0x06, 0x0d, 0x07, 0x6d, 0x73, 0xbd, 0xb9, 0x20, 0x71, 0x74, 0x6a, 0xc8, 0x1f,
	0x86, 0xbb, 0xb3, 0xa0, 0x33, 0xd8, 0x2a, 0xb7, 0x4c, 0x24, 0xa0, 0x59, 0xb7, 0xd2, 0x57, 0x07,
	0x0d, 0x07, 0x2f, 0x73, 0x1d, 0x6c, 0x73, 0xbd, 0x2d, 0x92, 0x7b, 0x26, 0xc3, 0x6d, 0x96, 0x64,
	0xb8, 0x03, 0xe8, 0x02, 0x6a, 0xf2, 0x36, 0x8f, 0xc5, 0xf3, 0x88, 0x72, 0xea, 0x77, 0xd5, 0xbe,
	0x3a, 0xa8, 0x3b, 0xfa, 0x32, 0xd7, 0x95, 0x6d, 0xae, 0x77, 0xe4, 0x1b, 0xf6, 0x5c, 0x86, 0xdb,
	0x12, 0x68, 0xb4, 0x23, 0x07, 0x1e, 0xac, 0x89, 0x93, 0x50, 0x1b, 0x22, 0xa1, 0xce, 0x93, 0x90,
	0x87, 0x24, 0x1a, 0x15, 0x4b, 0x35, 0x05, 0x35, 0x21, 0x14, 0xfc, 0x96, 0x71, 0xaa, 0x01, 0xd4,
	0x81, 0x7f, 0xc4, 0xf7, 0x98, 0x46, 0x34, 0x20, 0x9c, 0x5e, 0x73, 0x32, 0xa3, 0x5a, 0x05, 0xd5,
	0x61, 0xf5, 0xc6, 0x19, 0xdb, 0x9a, 0x2a, 0xd5, 0xb1, 0x56, 0xed, 0x55, 0x5f, 0xde, 0xb0, 0xe2,
	0x5c, 0x2e, 0xd7, 0x18, 0xac, 0xd6, 0x18, 0x7c, 0xae, 0x31, 0x78, 0xdd, 0x60, 0x65, 0xb5, 0xc1,
	0xca, 0xc7, 0x06, 0x2b, 0x77, 0x76, 0x10, 0xf2, 0xfb, 0x87, 0xa9, 0xe9, 0xb1, 0xd8, 0xfa, 0x51,
	0x4d, 0xd1, 0x64, 0x72, 0x24, 0xbb, 0xb1, 0x9e, 0x65, 0xb1, 0x7c, 0x31, 0xa7, 0xd9, 0xb4, 0x56,
	0x96, 0x71, 0xf2, 0x15, 0x00, 0x00, 0xff, 0xff, 0x21, 0x52, 0x51, 0xee, 0xf3, 0x01, 0x00, 0x00,
}

func (m *ActionRecord) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *ActionRecord) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *ActionRecord) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.ActionCompleted) > 0 {
		for iNdEx := len(m.ActionCompleted) - 1; iNdEx >= 0; iNdEx-- {
			i--
			if m.ActionCompleted[iNdEx] {
				dAtA[i] = 1
			} else {
				dAtA[i] = 0
			}
		}
		i = encodeVarintActionRecord(dAtA, i, uint64(len(m.ActionCompleted)))
		i--
		dAtA[i] = 0x1a
	}
	if len(m.ClaimAddresses) > 0 {
		for iNdEx := len(m.ClaimAddresses) - 1; iNdEx >= 0; iNdEx-- {
			i -= len(m.ClaimAddresses[iNdEx])
			copy(dAtA[i:], m.ClaimAddresses[iNdEx])
			i = encodeVarintActionRecord(dAtA, i, uint64(len(m.ClaimAddresses[iNdEx])))
			i--
			dAtA[i] = 0x12
		}
	}
	if len(m.Address) > 0 {
		i -= len(m.Address)
		copy(dAtA[i:], m.Address)
		i = encodeVarintActionRecord(dAtA, i, uint64(len(m.Address)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintActionRecord(dAtA []byte, offset int, v uint64) int {
	offset -= sovActionRecord(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *ActionRecord) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Address)
	if l > 0 {
		n += 1 + l + sovActionRecord(uint64(l))
	}
	if len(m.ClaimAddresses) > 0 {
		for _, s := range m.ClaimAddresses {
			l = len(s)
			n += 1 + l + sovActionRecord(uint64(l))
		}
	}
	if len(m.ActionCompleted) > 0 {
		n += 1 + sovActionRecord(uint64(len(m.ActionCompleted))) + len(m.ActionCompleted)*1
	}
	return n
}

func sovActionRecord(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozActionRecord(x uint64) (n int) {
	return sovActionRecord(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *ActionRecord) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowActionRecord
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: ActionRecord: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: ActionRecord: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Address", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowActionRecord
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthActionRecord
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthActionRecord
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Address = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ClaimAddresses", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowActionRecord
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthActionRecord
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthActionRecord
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ClaimAddresses = append(m.ClaimAddresses, string(dAtA[iNdEx:postIndex]))
			iNdEx = postIndex
		case 3:
			if wireType == 0 {
				var v int
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowActionRecord
					}
					if iNdEx >= l {
						return io.ErrUnexpectedEOF
					}
					b := dAtA[iNdEx]
					iNdEx++
					v |= int(b&0x7F) << shift
					if b < 0x80 {
						break
					}
				}
				m.ActionCompleted = append(m.ActionCompleted, bool(v != 0))
			} else if wireType == 2 {
				var packedLen int
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowActionRecord
					}
					if iNdEx >= l {
						return io.ErrUnexpectedEOF
					}
					b := dAtA[iNdEx]
					iNdEx++
					packedLen |= int(b&0x7F) << shift
					if b < 0x80 {
						break
					}
				}
				if packedLen < 0 {
					return ErrInvalidLengthActionRecord
				}
				postIndex := iNdEx + packedLen
				if postIndex < 0 {
					return ErrInvalidLengthActionRecord
				}
				if postIndex > l {
					return io.ErrUnexpectedEOF
				}
				var elementCount int
				elementCount = packedLen
				if elementCount != 0 && len(m.ActionCompleted) == 0 {
					m.ActionCompleted = make([]bool, 0, elementCount)
				}
				for iNdEx < postIndex {
					var v int
					for shift := uint(0); ; shift += 7 {
						if shift >= 64 {
							return ErrIntOverflowActionRecord
						}
						if iNdEx >= l {
							return io.ErrUnexpectedEOF
						}
						b := dAtA[iNdEx]
						iNdEx++
						v |= int(b&0x7F) << shift
						if b < 0x80 {
							break
						}
					}
					m.ActionCompleted = append(m.ActionCompleted, bool(v != 0))
				}
			} else {
				return fmt.Errorf("proto: wrong wireType = %d for field ActionCompleted", wireType)
			}
		default:
			iNdEx = preIndex
			skippy, err := skipActionRecord(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthActionRecord
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipActionRecord(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowActionRecord
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowActionRecord
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowActionRecord
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthActionRecord
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupActionRecord
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthActionRecord
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthActionRecord        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowActionRecord          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupActionRecord = fmt.Errorf("proto: unexpected end of group")
)

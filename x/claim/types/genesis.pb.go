// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: clan/claim/v1beta1/genesis.proto

package types

import (
	fmt "fmt"
	types "github.com/cosmos/cosmos-sdk/types"
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

// GenesisState defines the claim module's genesis state.
type GenesisState struct {
	// balance of the claim module's account
	ModuleAccountBalance types.Coin `protobuf:"bytes,1,opt,name=module_account_balance,json=moduleAccountBalance,proto3" json:"module_account_balance" yaml:"module_account_balance"`
	// params defines all the parameters of the module.
	Params Params `protobuf:"bytes,2,opt,name=params,proto3" json:"params" yaml:"params"`
	// list of claim records, one for every airdrop recipient
	ClaimRecords []ClaimRecord `protobuf:"bytes,3,rep,name=claim_records,json=claimRecords,proto3" json:"claim_records" yaml:"claim_records"`
	// list of action records, one for every clan address
	ActionRecords []ClaimRecord `protobuf:"bytes,4,rep,name=action_records,json=actionRecords,proto3" json:"action_records" yaml:"action_records"`
	// list of claim records, one for every airdrop recipient
	ClaimEthRecords []ClaimEthRecord `protobuf:"bytes,5,rep,name=claim_eth_records,json=claimEthRecords,proto3" json:"claim_eth_records" yaml:"claim_eth_records"`
}

func (m *GenesisState) Reset()         { *m = GenesisState{} }
func (m *GenesisState) String() string { return proto.CompactTextString(m) }
func (*GenesisState) ProtoMessage()    {}
func (*GenesisState) Descriptor() ([]byte, []int) {
	return fileDescriptor_9221dc6ca77f638d, []int{0}
}
func (m *GenesisState) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *GenesisState) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_GenesisState.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *GenesisState) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GenesisState.Merge(m, src)
}
func (m *GenesisState) XXX_Size() int {
	return m.Size()
}
func (m *GenesisState) XXX_DiscardUnknown() {
	xxx_messageInfo_GenesisState.DiscardUnknown(m)
}

var xxx_messageInfo_GenesisState proto.InternalMessageInfo

func (m *GenesisState) GetModuleAccountBalance() types.Coin {
	if m != nil {
		return m.ModuleAccountBalance
	}
	return types.Coin{}
}

func (m *GenesisState) GetParams() Params {
	if m != nil {
		return m.Params
	}
	return Params{}
}

func (m *GenesisState) GetClaimRecords() []ClaimRecord {
	if m != nil {
		return m.ClaimRecords
	}
	return nil
}

func (m *GenesisState) GetActionRecords() []ClaimRecord {
	if m != nil {
		return m.ActionRecords
	}
	return nil
}

func (m *GenesisState) GetClaimEthRecords() []ClaimEthRecord {
	if m != nil {
		return m.ClaimEthRecords
	}
	return nil
}

func init() {
	proto.RegisterType((*GenesisState)(nil), "ClanNetwork.clannetwork.claim.v1beta1.GenesisState")
}

func init() { proto.RegisterFile("clan/claim/v1beta1/genesis.proto", fileDescriptor_9221dc6ca77f638d) }

var fileDescriptor_9221dc6ca77f638d = []byte{
	// 433 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x9c, 0x92, 0x41, 0x8b, 0xda, 0x40,
	0x14, 0xc7, 0x93, 0x6a, 0x3d, 0x44, 0x6d, 0x69, 0xd0, 0x92, 0x4a, 0x8d, 0x21, 0x20, 0xd8, 0x83,
	0x13, 0xb4, 0xf4, 0xd2, 0x5b, 0x23, 0xa5, 0x87, 0x42, 0x29, 0xe9, 0xad, 0x14, 0x64, 0x32, 0x0e,
	0x31, 0x34, 0x99, 0x91, 0xcc, 0xc4, 0xea, 0xb9, 0x5f, 0xa0, 0x1f, 0xcb, 0xa3, 0xc7, 0xc2, 0x82,
	0x2c, 0xfa, 0x0d, 0xf6, 0x13, 0x2c, 0xc9, 0x8c, 0x6b, 0xb2, 0xb8, 0xe0, 0xee, 0x6d, 0xe6, 0xcd,
	0xfb, 0xff, 0x7f, 0xef, 0xbd, 0x79, 0x9a, 0x85, 0x22, 0x48, 0x1c, 0x14, 0xc1, 0x30, 0x76, 0x96,
	0x23, 0x1f, 0x73, 0x38, 0x72, 0x02, 0x4c, 0x30, 0x0b, 0x19, 0x58, 0x24, 0x94, 0x53, 0xbd, 0x3f,
	0x89, 0x20, 0xf9, 0x86, 0xf9, 0x1f, 0x9a, 0xfc, 0x06, 0x59, 0x36, 0x39, 0x9d, 0xc3, 0x18, 0x48,
	0x51, 0xa7, 0x15, 0xd0, 0x80, 0xe6, 0x0a, 0x27, 0x3b, 0x09, 0x71, 0xa7, 0x77, 0xc6, 0x7e, 0x01,
	0x13, 0x18, 0x4b, 0xf7, 0x4e, 0xff, 0x4c, 0x42, 0x7e, 0x9b, 0x26, 0x18, 0xd1, 0x64, 0x26, 0xd3,
	0x4c, 0x44, 0x59, 0x4c, 0x99, 0xe3, 0x43, 0x86, 0x4f, 0x79, 0x34, 0x24, 0xf2, 0xfd, 0xdd, 0x83,
	0x36, 0x98, 0xcf, 0x4b, 0x56, 0xf6, 0x55, 0x55, 0x6b, 0x7c, 0x11, 0x1d, 0xfe, 0xe0, 0x90, 0x63,
	0x7d, 0xa9, 0xbd, 0x8e, 0xe9, 0x2c, 0x8d, 0xf0, 0x14, 0x22, 0x44, 0x53, 0xc2, 0xa7, 0x3e, 0x8c,
	0x20, 0x41, 0xd8, 0x50, 0x2d, 0x75, 0x50, 0x1f, 0xbf, 0x01, 0x02, 0x0e, 0x32, 0xf8, 0xb1, 0x5f,
	0x30, 0xa1, 0x21, 0x71, 0xfb, 0x9b, 0x5d, 0x4f, 0xb9, 0xd9, 0xf5, 0xba, 0x6b, 0x18, 0x47, 0x1f,
	0xed, 0xf3, 0x36, 0xb6, 0xd7, 0x12, 0x0f, 0x9f, 0x44, 0xdc, 0x15, 0x61, 0xfd, 0x97, 0x56, 0x13,
	0xa3, 0x30, 0x9e, 0xe5, 0x9c, 0x21, 0xb8, 0x68, 0xd2, 0xe0, 0x7b, 0x2e, 0x72, 0xdb, 0x92, 0xdd,
	0x14, 0x6c, 0x61, 0x65, 0x7b, 0xd2, 0x53, 0x4f, 0xb5, 0x66, 0x71, 0x8e, 0xcc, 0xa8, 0x58, 0x95,
	0x41, 0x7d, 0x3c, 0xbe, 0x10, 0x32, 0xc9, 0x6e, 0x5e, 0x2e, 0x75, 0xdf, 0x4a, 0x52, 0x4b, 0x90,
	0x4a, 0xb6, 0xb6, 0xd7, 0x40, 0xa7, 0x54, 0xa6, 0xaf, 0xb4, 0x17, 0x10, 0xf1, 0x90, 0x92, 0x3b,
	0x6e, 0xf5, 0xc9, 0xdc, 0xae, 0xe4, 0xb6, 0x05, 0xb7, 0xec, 0x6b, 0x7b, 0x4d, 0x11, 0x38, 0x92,
	0xff, 0xaa, 0xda, 0xab, 0xfb, 0x5f, 0xce, 0x8c, 0xe7, 0x39, 0xfd, 0xc3, 0x63, 0xe8, 0x9f, 0xf9,
	0x5c, 0x16, 0x60, 0xc9, 0x02, 0x8c, 0x62, 0xe3, 0x05, 0x77, 0xdb, 0x7b, 0x89, 0x4a, 0x0a, 0xe6,
	0x7e, 0xdd, 0xec, 0x4d, 0x75, 0xbb, 0x37, 0xd5, 0xeb, 0xbd, 0xa9, 0xfe, 0x3b, 0x98, 0xca, 0xf6,
	0x60, 0x2a, 0xff, 0x0f, 0xa6, 0xf2, 0x73, 0x14, 0x84, 0x7c, 0x9e, 0xfa, 0x00, 0xd1, 0xd8, 0x29,
	0x54, 0x93, 0xad, 0x29, 0x19, 0xca, 0x72, 0x9c, 0x95, 0xdc, 0x61, 0xbe, 0x5e, 0x60, 0xe6, 0xd7,
	0xf2, 0x8d, 0x7d, 0x7f, 0x1b, 0x00, 0x00, 0xff, 0xff, 0x7b, 0x43, 0xdd, 0xa3, 0xa5, 0x03, 0x00,
	0x00,
}

func (m *GenesisState) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *GenesisState) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *GenesisState) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.ClaimEthRecords) > 0 {
		for iNdEx := len(m.ClaimEthRecords) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.ClaimEthRecords[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintGenesis(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x2a
		}
	}
	if len(m.ActionRecords) > 0 {
		for iNdEx := len(m.ActionRecords) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.ActionRecords[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintGenesis(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x22
		}
	}
	if len(m.ClaimRecords) > 0 {
		for iNdEx := len(m.ClaimRecords) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.ClaimRecords[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintGenesis(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x1a
		}
	}
	{
		size, err := m.Params.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintGenesis(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x12
	{
		size, err := m.ModuleAccountBalance.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintGenesis(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0xa
	return len(dAtA) - i, nil
}

func encodeVarintGenesis(dAtA []byte, offset int, v uint64) int {
	offset -= sovGenesis(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *GenesisState) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = m.ModuleAccountBalance.Size()
	n += 1 + l + sovGenesis(uint64(l))
	l = m.Params.Size()
	n += 1 + l + sovGenesis(uint64(l))
	if len(m.ClaimRecords) > 0 {
		for _, e := range m.ClaimRecords {
			l = e.Size()
			n += 1 + l + sovGenesis(uint64(l))
		}
	}
	if len(m.ActionRecords) > 0 {
		for _, e := range m.ActionRecords {
			l = e.Size()
			n += 1 + l + sovGenesis(uint64(l))
		}
	}
	if len(m.ClaimEthRecords) > 0 {
		for _, e := range m.ClaimEthRecords {
			l = e.Size()
			n += 1 + l + sovGenesis(uint64(l))
		}
	}
	return n
}

func sovGenesis(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozGenesis(x uint64) (n int) {
	return sovGenesis(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *GenesisState) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowGenesis
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
			return fmt.Errorf("proto: GenesisState: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: GenesisState: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ModuleAccountBalance", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGenesis
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthGenesis
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthGenesis
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.ModuleAccountBalance.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Params", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGenesis
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthGenesis
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthGenesis
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.Params.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ClaimRecords", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGenesis
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthGenesis
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthGenesis
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ClaimRecords = append(m.ClaimRecords, ClaimRecord{})
			if err := m.ClaimRecords[len(m.ClaimRecords)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ActionRecords", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGenesis
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthGenesis
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthGenesis
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ActionRecords = append(m.ActionRecords, ClaimRecord{})
			if err := m.ActionRecords[len(m.ActionRecords)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ClaimEthRecords", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGenesis
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthGenesis
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthGenesis
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ClaimEthRecords = append(m.ClaimEthRecords, ClaimEthRecord{})
			if err := m.ClaimEthRecords[len(m.ClaimEthRecords)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipGenesis(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthGenesis
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
func skipGenesis(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowGenesis
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
					return 0, ErrIntOverflowGenesis
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
					return 0, ErrIntOverflowGenesis
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
				return 0, ErrInvalidLengthGenesis
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupGenesis
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthGenesis
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthGenesis        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowGenesis          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupGenesis = fmt.Errorf("proto: unexpected end of group")
)

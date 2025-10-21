import type { Item } from "@/components/ui/animated-list-demo"
import { BellRing } from "lucide-react"

// Ethereum Beacon Chain (Mainnet) themed notifications
export const ethereumMainnetNotifications: Item[] = [
  {
    name: "Block proposed",
    description: "Validator 0xA3F…9D • Slot 888,321",
    time: "12s ago",
    icon: <BellRing size={24} />,
    color: "#1E86FF",
  },
  {
    name: "Attestation included",
    description: "Committee 4 • Epoch 296",
    time: "36s ago",
    icon: <BellRing size={24} />,
    color: "#00C9A7",
  },
  {
    name: "New peer connected",
    description: "Peer 52.87.10.24:9000",
    time: "1m ago",
    icon: <BellRing size={24} />,
    color: "#7C3AED",
  },
  {
    name: "Checkpoint finalized",
    description: "Epoch 296 • 96% participation",
    time: "4m ago",
    icon: <BellRing size={24} />,
    color: "#FFB800",
  },
  {
    name: "Sync completed",
    description: "Head 0xabc…123 • Slot 888,322",
    time: "6m ago",
    icon: <BellRing size={24} />,
    color: "#06B6D4",
  },
  {
    name: "Slashing alert",
    description: "Double vote suspected • 0x9C…2E",
    time: "11m ago",
    icon: <BellRing size={24} />,
    color: "#EF4444",
  },
]

// Cosmos/Tendermint themed notifications
export const cosmosNotifications: Item[] = [
  {
    name: "Block committed",
    description: "osmosis-1 • Height 12,345,678 • 1.2s",
    time: "10s ago",
    icon: <BellRing size={24} />,
    color: "#4F46E5",
  },
  {
    name: "Precommit received",
    description: "cosmosvaloper1k9…mz6 • Round 2",
    time: "25s ago",
    icon: <BellRing size={24} />,
    color: "#10B981",
  },
  {
    name: "Peer handshake",
    description: "node a0b1…c3d4 • p2p • 26656",
    time: "1m ago",
    icon: <BellRing size={24} />,
    color: "#7C3AED",
  },
  {
    name: "IBC packet received",
    description: "transfer/channel-141 • seq 102938",
    time: "3m ago",
    icon: <BellRing size={24} />,
    color: "#06B6D4",
  },
  {
    name: "Delegation received",
    description: "delegator cosmos1xy…9q2 → 10,000 ATOM",
    time: "6m ago",
    icon: <BellRing size={24} />,
    color: "#16A34A",
  },
  {
    name: "Slashing evidence",
    description: "double-sign • cosmosvalcons1… • height 12,345,600",
    time: "8m ago",
    icon: <BellRing size={24} />,
    color: "#EF4444",
  },
]

// Polkadot/Substrate themed notifications
export const polkadotNotifications: Item[] = [
  {
    name: "Block authored",
    description: "ParaId 2000 • Block 9,876,543",
    time: "14s ago",
    icon: <BellRing size={24} />,
    color: "#E6007A",
  },
  {
    name: "Session rotation",
    description: "Era 512 • Session 3",
    time: "3m ago",
    icon: <BellRing size={24} />,
    color: "#6366F1",
  },
  {
    name: "Grandpa finalized",
    description: "Finalized 9,876,540",
    time: "7m ago",
    icon: <BellRing size={24} />,
    color: "#F59E0B",
  },
]

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Car, Volume2, Projector, Wifi, Bike, Tv, Laptop, Smartphone } from "lucide-react"
import type { AssetBooking, AssetType } from "@/lib/asset-api"

interface AssetTableProps {
  assets: AssetBooking[]
  isLoading: boolean
}

export function AssetTable({ assets, isLoading }: AssetTableProps) {
  // Function to get icon for asset type
  const getAssetIcon = (assetType: AssetType) => {
    const iconProps = { className: "h-5 w-5" }

    switch (assetType) {
      case "Car":
        return <Car {...iconProps} className="h-5 w-5 text-blue-600" />
      case "Speaker":
        return <Volume2 {...iconProps} className="h-5 w-5 text-purple-600" />
      case "Projector":
        return <Projector {...iconProps} className="h-5 w-5 text-orange-600" />
      case "Wifi Router":
        return <Wifi {...iconProps} className="h-5 w-5 text-green-600" />
      case "Bike":
        return <Bike {...iconProps} className="h-5 w-5 text-red-600" />
      case "TV":
        return <Tv {...iconProps} className="h-5 w-5 text-indigo-600" />
      case "Laptop":
        return <Laptop {...iconProps} className="h-5 w-5 text-gray-600" />
      case "Mobile phone":
        return <Smartphone {...iconProps} className="h-5 w-5 text-pink-600" />
      default:
        return <Car {...iconProps} />
    }
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  // Function to check if booking is current
  const isCurrentBooking = (borrowDate: string, returnDate: string) => {
    const today = new Date()
    const borrow = new Date(borrowDate)
    const returnD = new Date(returnDate)

    return borrow <= today && today <= returnD
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading asset bookings...</div>
  }

  if (assets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No asset bookings found. Create a new booking using the button above.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Type</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => {
            const borrowDate = new Date(asset.borrow_date)
            const returnDate = new Date(asset.return_date)
            const duration = Math.ceil((returnDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24))
            const isCurrent = isCurrentBooking(asset.borrow_date, asset.return_date)

            return (
              <TableRow key={asset.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {getAssetIcon(asset.asset_type)}
                    <span className="font-medium">{asset.asset_type}</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(asset.borrow_date)}</TableCell>
                <TableCell>{formatDate(asset.return_date)}</TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {duration} {duration === 1 ? "day" : "days"}
                  </span>
                </TableCell>
                <TableCell>{formatDate(asset.created_at)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

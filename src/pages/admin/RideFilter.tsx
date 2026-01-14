import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const RideFilters = () => {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search */}
        <Input placeholder="Search by Ride ID..." className="md:max-w-sm" />

        {/* Status Filter */}
        <Select>
          <SelectTrigger className="md:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default RideFilters;

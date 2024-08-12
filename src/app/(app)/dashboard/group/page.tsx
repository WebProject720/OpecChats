import { Group } from "../components/group/page";
import DashboardLayout from "../DashboardLayout";


export default function Page() {
    return (
        <DashboardLayout>
            <div className="w-full h-full">
                <Group />
            </div>
        </DashboardLayout>
    )
}

import Job from "./Job";
import FlightCrew from "./FlightCrew";
interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    job_id: number |  Job;
    crew_id: number |  FlightCrew;
}
export = Employee;
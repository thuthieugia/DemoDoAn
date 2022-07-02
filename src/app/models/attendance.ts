export class Attendance {
  attendanceID!: string;
  studentID!: string;
  studentCode!: string;
  fullName!: string;
  practiceScheduleID!: string;
  startTime : Date | undefined;
  endTime : Date | undefined;
  description!: string;
  attendanceStatus!: number;
  practiceSchedule!: string;
  attendanceStudentCode!: string;
  attendanceStudentName!: string;
  isDeleting: boolean = false;
  }

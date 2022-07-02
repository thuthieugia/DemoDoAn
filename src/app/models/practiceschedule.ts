export class Practiceschedule {
  practiceScheduleID!: string;
  date: string | undefined;
  practiceShiftID: string | undefined;
  practiceSchedulePracticeShiftname: string | undefined;
  practiceGroupID: string | undefined;
  practiceSchedulePracticeGroup: string | undefined;
  practicalLaboratoryID: string | undefined;
  practiceSchedulePracticalLaboratory: string | undefined;
  status: number | undefined;
  description: string | undefined;
  practiceSchedulePracticeShiftstarttime: string | undefined;
  practiceSchedulePracticeShiftendtime: string | undefined;
  schoolYearID: string | undefined;
  practiceScheduleSchoolYear: string | undefined;
  semesterID: string | undefined;
  practiceScheduleSemester: string | undefined;
  teacherID: string | undefined;
  practiceScheduleTeacher: string | undefined;
  request: number = 0;
  isDeleting: boolean = false;
  vang: number = 0;
}

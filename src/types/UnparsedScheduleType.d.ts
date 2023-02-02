type UnparsedScheduleType = {
  [index: string]: {
    start: { hour: number; minute: number };
    end: { hour: number; minute: number };
  };
};

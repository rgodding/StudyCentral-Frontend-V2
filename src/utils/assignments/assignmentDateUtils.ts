const assignmentDateText = {
  due: "Due",
  noDeadline: "No deadline",
};

export function formatAssignmentDeadline(deadline?: string | null) {
  if (!deadline) {
    return assignmentDateText.noDeadline;
  }

  return `${assignmentDateText.due} ${new Date(deadline).toLocaleDateString()}`;
}
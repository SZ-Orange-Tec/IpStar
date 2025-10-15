import menu from "../components/menu/en"
import navbar from "../components/navbar/en"
export default {
  ...menu,
  ...navbar,

  Note: "Note",

  Settings: "Settings",
  whitelist: "Whitelist",
  Password: "Password",

  Copy: "Copy",
  Regenerate: "Regenerate",

  Add: "Add",

  Notes: "Notes",
  Date: "Date",
  Manage: "Manage",
  Delete: "Delete",
  At_the_end: "At the end",
  Save: "Save",
  Prompts: "Prompts",

  Old_password: "Old password",
  New_password: "New password",
  Repeat_new_password: "Repeat new password",
  Add_to: "Add to",
  OK: "OK",
  Cancel: "Cancel",

  whitelist_spec: {
    add_whitelist: "Add to whitelist",
    ip_tip: "请输入IP地址...",
    notes: "Notes(Optional)",
    notes_tip: "Please enter note information...",

    popover:
      "The API Key provides authorization for your program to request APIs. When you change the API Key, you need to modify your programs for continuing to run.",

    white_tip1: "The current policy for whitelisting is discretionary application.",
    white_tip2:
      "When you add one or more IP addresses to the whitelist, the public IP addresses of the network from which you request our proxy service will be limited to those in the whitelist, and the proxy service will not be available elsewhere.",

    verify: "We need to verify your identity.",
    input_password: "Please enter your password.",
    confirm_delete: "Are you sure you want to delete it?",
  },
}

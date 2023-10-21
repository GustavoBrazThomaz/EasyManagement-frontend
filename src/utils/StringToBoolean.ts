export function stringToBoolean(str: string): boolean {
    const lowerCaseStr = str.toLowerCase();
  
    if (lowerCaseStr === "true") {
      return true;
    } 
    if (lowerCaseStr === "false") {
      return false;
    } 
    return false
  }
@objc(DetoxContext)
public class DetoxContext: NSObject {
  @objc
  public static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  public static func processLaunchArgs() -> [String:Any] {
    let arguments = ProcessInfo.processInfo.arguments
    var props: [String:Any] = [:]

    for (index, element) in  arguments.enumerated() {
      if (element.starts(with: "-")) {
        let propName = String(element.dropFirst())
        let propValue = arguments[index + 1]

        if (propValue == "true" || propValue == "false") {
          props[propName] = propValue == "true"
        } else {
          props[propName] = propValue
        }
      }
    }

    // If it's not an automated test then don't send anything
    guard let isAutomatedTest = props["isAutomatedTest"] as? Bool, isAutomatedTest == true else {
      return [:]
    }

    return ["detoxContext": props]
  }
}

interface BrowserReg {
  [Chrome: string]: RegExp
  IE: RegExp
  Firefox: RegExp
  Opera: RegExp
  Safari: RegExp
  '360': RegExp
  QQBrowswe: RegExp
}

interface DeviceReg {
  [iPhone: string]: RegExp
  Android: RegExp
  iPad: RegExp
  Windows: RegExp
  Mac: RegExp
}

/** 用户设备信息 */
export interface UserAgentObj {
  /** 浏览器名称 */
  browserName: string
  /** 浏览器版本 */
  browserVersion: string
  /** 操作系统名称 */
  osName: string
  /** 操作系统版本 */
  osVersion: string
  /** 设备名称 */
  deviceName: string
}

let browserReg: BrowserReg = {
  Chrome: /Chrome/,
  IE: /MSIE/,
  Firefox: /Firefox/,
  Opera: /Presto/,
  Safari: /Version\/([\d.]+).*Safari/,
  '360': /360SE/,
  QQBrowswe: /QQ/,
}

let deviceReg: DeviceReg = {
  iPhone: /iPhone/,
  iPad: /iPad/,
  Android: /Android/,
  Windows: /Windows/,
  Mac: /Macintosh/,
}

export const getUserAgent = () => {
  let userAgentStr = navigator.userAgent
  const userAgentObj: UserAgentObj = {
    browserName: '',
    browserVersion: '',
    osName: '',
    osVersion: '',
    deviceName: '',
  }

  for (let key in browserReg) {
    if (browserReg[key].test(userAgentStr)) {
      userAgentObj.browserName = key
      if (key === 'Chrome') {
        userAgentObj.browserVersion = userAgentStr.split('Chrome/')[1].split(' ')[0]
      } else if (key === 'IE') {
        userAgentObj.browserVersion = userAgentStr.split('MSIE ')[1].split(' ')[1]
      } else if (key === 'Firefox') {
        userAgentObj.browserVersion = userAgentStr.split('Firefox/')[1]
      } else if (key === 'Opera') {
        userAgentObj.browserVersion = userAgentStr.split('Version/')[1]
      } else if (key === 'Safari') {
        userAgentObj.browserVersion = userAgentStr.split('Version/')[1].split(' ')[0]
      } else if (key === '360') {
        userAgentObj.browserVersion = ''
      } else if (key === 'QQBrowswe') {
        userAgentObj.browserVersion = userAgentStr.split('Version/')[1].split(' ')[0]
      }
    }
  }

  for (let key in deviceReg) {
    if (deviceReg[key].test(userAgentStr)) {
      userAgentObj.osName = key
      if (key === 'Windows') {
        userAgentObj.osVersion = userAgentStr.split('Windows NT ')[1].split(';')[0]
      } else if (key === 'Mac') {
        userAgentObj.osVersion = userAgentStr.split('Mac OS X ')[1].split(')')[0]
      } else if (key === 'iPhone') {
        userAgentObj.osVersion = userAgentStr.split('iPhone OS ')[1].split(' ')[0]
      } else if (key === 'iPad') {
        userAgentObj.osVersion = userAgentStr.split('iPad; CPU OS ')[1].split(' ')[0]
      } else if (key === 'Android') {
        userAgentObj.osVersion = userAgentStr.split('Android ')[1].split(';')[0]
        userAgentObj.deviceName = userAgentStr
          .split('(Linux; Android ')[1]
          .split('; ')[1]
          .split(' Build')[0]
      }
    }
  }

  return userAgentObj
}

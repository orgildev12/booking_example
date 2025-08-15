'use server';

import instance from "@/utils/axios";

export async function handleMileSubmitServer(values) {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url: `https://mws.miat.com/mws.asmx/RetrieveBlueSkyMemberProfile`,
      data: {
        MemberID: values.bsmnum,
        Password: values.bsmpass
      },
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      console.log(res.data)
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
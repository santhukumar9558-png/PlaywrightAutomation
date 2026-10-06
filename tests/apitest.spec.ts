import { request } from "node:http";
import { APIResponse } from "@playwright/test";
import {test, expect} from '@playwright/test'


test('api validation', async({request}) =>{

    const response = await request.get("", {
        headers:{

        },
        params:{

        }
    });

    expect(response.status()).toBe(200);

   const responseBody = response.json();

   const responsePost = await request.post("", {

    headers:{

    },
    data:{

    },
    params:{

    },

   })
   
})
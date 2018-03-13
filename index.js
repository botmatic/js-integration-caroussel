const botmatic = require('@botmatic/js-integration')({port: 5050})

botmatic.onAction(".*", ({client, data}) => {
  console.log(data)
  return new Promise((resolve, reject) => {
    var res_jobs = get_jobs_by_title(data.data.user['job title'], data.data.last_user_message);

    if (res_jobs.length > 0 ) {
      resolve({data: {
        "type": "Collection",
        "items": res_jobs
      }, type: "data"});
    } else {
      resolve({data: "", type: "data"});
    }
  })
})

const get_jobs_by_title = (jobtitle = "no possible job", title) => {

  var res = jobs.filter(j => {
    var regex1 = RegExp('.*'+(j.name)+'*', 'gi');
    var regex2 = RegExp('.*'+title+'*', 'gi');
    var regex3 = RegExp('.*'+jobtitle+'*', 'gi');
    return (regex1.test(title) || regex2.test(j.name)) || (regex1.test(jobtitle) || regex3.test(j.name))
  })

  var final_res = []
  var nb = 1;

  res.forEach((i) => {
    final_res.push(construct_item(i, nb))
    nb++;
  })

  final_res = final_res.slice(0, 3)

  console.log("final_res.length: " + final_res.length)

  return final_res
}

const construct_item = (job, nb) => {
   return {
     "type": "Image",
     "name": job.name,
     "content": job.content,
     "url": job.img,
     "attachment": [
       {
       "type": "Button",
       "content": "Learn more",
       "name": "Learn more",
       "mediaType": "text/html",
       "url": job.url
       },
       {
           "type": "Button",
           "content": "Apply " + nb,
           "mediaType":"text/plain",
           "name": "Apply " + nb,
           "url": "Apply " + nb
       }
       , {
         "type": "Button",
         "content": "Decline " + nb,
         "mediaType":"text/plain",
         "name": "Decline " + nb,
         "url": "Decline " + nb
       }

     ]
   }
}

var jobs =
[
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/fe0d676f-39bf-4f7a-93a0-a96e8db24ab2/huge?r=s3&_1520521173918',
    name: 'Finance Analyst',
    content: 'SmartRecruiters Corp Demo is looking for a Finance Analyst in 225 Bush St, San Francisco, CA 94104, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667239140-finance-analyst?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/fe0d676f-39bf-4f7a-93a0-a96e8db24ab2/huge?r=s3&_1520521173918',
    name: 'Finance Analyst',
    content: 'SmartRecruiters Corp Demo is looking for a Finance Analyst in 225 Bush St, San Francisco, CA 94104, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667237769-finance-analyst?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/5668f2da-e926-4c44-bb5b-0ad8f3a6acdb/huge?r=s3&_1520549674044',
    name: 'Systems Test Engineer',
    content: 'SmartRecruiters Corp Demo is looking for a Systems Test Engineer in 1028 US-2, Spokane, WA 99258, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667200872-systems-test-engineer?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Full Stack Developer',
    content: 'SmartRecruiters Corp Demo is looking for a Full Stack Developer in San Francisco Bay Trail, San Francisco, CA, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667123420-full-stack-developer?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 225 Bush St, San Francisco, CA 94104, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667106148-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/14de5e69-441e-43dd-adee-b4a89705de71/huge?r=s3&_1457711182419',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 22, Cumberland, MD 21502, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667065885-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Binary | Converter',
    content: 'SmartRecruiters Corp Demo is looking for a Binary | Converter in Tatum, NM, Verenigde State van Amerika',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667054316-binary-converter?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/568c2682-b79f-4570-bf33-7830212c07a5/huge?r=s3&_1513708179711',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in Boston, MA, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667043667-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Sales Representative',
    content: 'SmartRecruiters Corp Demo is looking for a Sales Representative in San Francisco, CA, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667027681-sales-representative?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in Bellevue, WA, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666949622-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/65b2a282-7bb0-4edd-a27b-f63450d91761/huge?r=s3&_1520290400164',
    name: 'Account Manager/Inside Sales Support',
    content: 'SmartRecruiters Corp Demo is looking for a Account Manager/Inside Sales Support in Buford, GA, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666920317-account-manager-inside-sales-support?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in San Francisco, CA, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666915737-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in San Francisco, CA, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666898965-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/fe0d676f-39bf-4f7a-93a0-a96e8db24ab2/huge?r=s3&_1520521173918',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 22, Burkittsville, MD, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666778579-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Specialist',
    content: 'SmartRecruiters Corp Demo is looking for a Account Specialist in Spokane, WA, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666731008-account-specialist?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/14de5e69-441e-43dd-adee-b4a89705de71/huge?r=s3&_1457711182419',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 22, Cumberland, MD 21502, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666591554-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/fe0d676f-39bf-4f7a-93a0-a96e8db24ab2/huge?r=s3&_1520521173918',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 2202 N Division St, Spokane, WA 99207, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666493657-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/fe0d676f-39bf-4f7a-93a0-a96e8db24ab2/huge?r=s3&_1520521173918',
    name: 'Product',
    content: 'SmartRecruiters Corp Demo is looking for a Product in Main St, San Francisco, CA 94105, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666467117-product?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/14de5e69-441e-43dd-adee-b4a89705de71/huge?r=s3&_1457711182419',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 108 E Sprague Ave, Spokane, WA 99202, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666465104-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in London Bridge St, London SE1, UK',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666450801-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/14de5e69-441e-43dd-adee-b4a89705de71/huge?r=s3&_1457711182419',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in Spokane St, Cheney, WA 99004, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666436647-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/6ff1ef62-a4f0-4fe0-99e1-62dc905a419d/huge?r=s3&_1518134552087',
    name: 'Sales Representative',
    content: 'SmartRecruiters Corp Demo is looking for a Sales Representative in 108 E Sprague Ave, Spokane, WA 99202, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666209222-sales-representative?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 2250A Mission St, San Francisco, CA 94110, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666177764-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/7257ac00-0c32-434b-a29f-eb43e913481c_social_logo/300x300?r=s3&_1512531207336',
    name: 'Senior Sales Engineer',
    content: 'SmartRecruiters Corp Demo is looking for a Senior Sales Engineer in 108 E Sprague Ave, Spokane, WA 99202, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666156974-senior-sales-engineer?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/7257ac00-0c32-434b-a29f-eb43e913481c_social_logo/300x300?r=s3&_1512531207336',
    name: 'Sales Representative',
    content: 'SmartRecruiters Corp Demo is looking for a Sales Representative in 108 N Washington St, Spokane, WA 99201, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666145713-sales-representative?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/90e9d133-5003-4ced-8d07-4ca6fc02d778/huge?r=s3&_1518383990830',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 108 N Post St, Spokane, WA 99201, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666142508-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/14de5e69-441e-43dd-adee-b4a89705de71/huge?r=s3&_1457711182419',
    name: 'Peer Support Specialist',
    content: 'SmartRecruiters Corp Demo is looking for a Peer Support Specialist in 225 N Division St, Spokane, WA 99202, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666095632-peer-support-specialist?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 139 Quay St, Auckland, 1010, New Zealand',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666088742-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 2255 Market St, San Francisco, CA 94114, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666040663-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Sales Coach',
    content: 'SmartRecruiters Corp Demo is looking for a Sales Coach in 2430 Market St, San Francisco, CA 94114, Verenigde State van Amerika',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666038763-sales-coach?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in Fiji Ln, Alameda, CA 94502, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665987725-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 225 Bush St, San Francisco, CA 94104, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665957050-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/90e9d133-5003-4ced-8d07-4ca6fc02d778/huge?r=s3&_1518383990830',
    name: 'Head of Communications',
    content: 'SmartRecruiters Corp Demo is looking for a Head of Communications in 435 King St W, Toronto, ON M5V, Canada',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665930767-head-of-communications?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/90e9d133-5003-4ced-8d07-4ca6fc02d778/huge?r=s3&_1518383990830',
    name: 'Panellist',
    content: 'SmartRecruiters Corp Demo is looking for a Panellist in 225 108th Ave NE, Bellevue, WA 98004, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665896785-panellist?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/7108940d-9425-43e0-9771-6a79ba4f69b3/huge?r=s3&_1513048107714',
    name: 'Account Officer',
    content: 'SmartRecruiters Corp Demo is looking for a Account Officer in Manila, Malagasang II, Imus, Cavite, Philippines',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665881012-account-officer?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/5668f2da-e926-4c44-bb5b-0ad8f3a6acdb/huge?r=s3&_1520549674044',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 25 Market St, San Francisco, CA 94105, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665880743-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/14de5e69-441e-43dd-adee-b4a89705de71/huge?r=s3&_1457711182419',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 225 N Division St, Spokane, WA 99202, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665844471-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/318130b0-5db7-43dc-813f-aa3ef796e2dc/huge?r=s3&_1508437056112',
    name: 'sale',
    content: 'SmartRecruiters Corp Demo is looking for a sale in 2407 Mission St, San Francisco, CA 94110, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665824390-sale?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/5668f2da-e926-4c44-bb5b-0ad8f3a6acdb/huge?r=s3&_1520549674044',
    name: 'Enterprise Solutions Consultant',
    content: 'SmartRecruiters Corp Demo is looking for a Enterprise Solutions Consultant in 225 Bush St, San Francisco, CA 94104, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665823168-enterprise-solutions-consultant?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/14de5e69-441e-43dd-adee-b4a89705de71/huge?r=s3&_1457711182419',
    name: 'Rental Sales Agent',
    content: 'SmartRecruiters Corp Demo is looking for a Rental Sales Agent in W Spokane Falls Blvd, Spokane, WA, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665774411-rental-sales-agent?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/6443f06c-2f3e-40ad-bf27-6c42e9e50cc5/huge?r=s3&_1513285140941',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 2255 Market St, San Francisco, CA 94114, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665753237-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/6443f06c-2f3e-40ad-bf27-6c42e9e50cc5/huge?r=s3&_1513285140941',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 108 N Division St, Spokane, WA 99202, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665717778-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'BI Developer (Officevibe)',
    content: 'SmartRecruiters Corp Demo is looking for a BI Developer (Officevibe) in Telegraph Rd, Downey, CA, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665582209-bi-developer-officevibe-?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 2257 Market St, San Francisco, CA 94114, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665581974-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/d84773c3-d3a1-4188-92b2-fbde46b058a8_social_logo/300x300?r=s3&_1517513343557',
    name: 'Customer Success Sales Consultant',
    content: 'SmartRecruiters Corp Demo is looking for a Customer Success Sales Consultant in 225 N Division St, Spokane, WA 99202, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665539895-customer-success-sales-consultant?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/default_social_logo/300x300?r=s3&_1508434554415',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 108 N Washington St, Spokane, WA 99201, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665493179-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/14de5e69-441e-43dd-adee-b4a89705de71/huge?r=s3&_1457711182419',
    name: 'Account Executive',
    content: 'SmartRecruiters Corp Demo is looking for a Account Executive in 225 N Division St, Spokane, WA 99202, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665486314-account-executive?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/9d72dcd4-b3af-4cbc-9d59-468f6fed3d39/huge?r=s3&_1517347464518',
    name: 'ELECTRICAL / UPS TECHNICIAN (OCONUS) - (260)',
    content: 'SmartRecruiters Corp Demo is looking for a ELECTRICAL / UPS TECHNICIAN (OCONUS) - (260) in 208 N Stevens St, Spokane, WA 99201, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665484143-electrical-ups-technician-oconus-260-?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' },
  { img: 'https://c.smartrecruiters.com/sr-company-images-prod/56e2e604e4b0bb664e3f7a7c/90e9d133-5003-4ced-8d07-4ca6fc02d778/huge?r=s3&_1518383990830',
    name: 'Acquisition Marketing Manager',
    content: 'SmartRecruiters Corp Demo is looking for a Acquisition Marketing Manager in 1028 US-2, Spokane, WA 99258, USA',
    url: 'https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665476856-acquisition-marketing-manager?trid=162ef3c2-cdcc-47a9-8327-c69d95269302' } ]

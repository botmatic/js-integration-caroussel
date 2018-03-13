var jobs = [
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667239140-finance-analyst",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667237769-finance-analyst",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667200872-systems-test-engineer",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667123420-full-stack-developer",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667106148-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667065885-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667054316-binary-converter",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667043667-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999667027681-sales-representative",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666949622-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666920317-account-manager-inside-sales-support",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666915737-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666898965-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666778579-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666731008-account-specialist",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666591554-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666493657-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666467117-product",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666465104-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666450801-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666436647-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666209222-sales-representative",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666177764-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666156974-senior-sales-engineer",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666145713-sales-representative",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666142508-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666095632-peer-support-specialist",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666088742-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666040663-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999666038763-sales-coach",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665987725-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665957050-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665930767-head-of-communications",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665896785-panellist",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665881012-account-officer",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665880743-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665844471-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665824390-sale",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665823168-enterprise-solutions-consultant",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665774411-rental-sales-agent",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665753237-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665717778-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665582209-bi-developer-officevibe-",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665581974-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665539895-customer-success-sales-consultant",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665493179-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665486314-account-executive",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665484143-electrical-ups-technician-oconus-260-",
  "https://jobs.smartrecruiters.com/SmartRecruitersCorpDemo/743999665476856-acquisition-marketing-manager"
];

var request = require('request')
const cheerio = require('cheerio')

var final_jobs = []

const parse = (i, cb) => {

  console.log(i)
  request.get(jobs[i], (err, resp, html) => {

    if (err) console.log(err)
    else {
      // console.log("html")
      // console.log(html)
      var $ = cheerio.load(html);

      final_jobs.push({
        img: $('[property="og:image"]').attr('content'),
        name: $('[property="og:title"]').attr('content'),
        content: $('[name="twitter:title"]').attr('content'),
        url: $('[property="og:url"]').attr('content'),
      })

      if (i < (jobs.length-1)) {
        parse(i+1, cb)
      } else {
        cb()
      }

      console.log($('[property="og:url"]').attr('content'))
    }

  })
}

parse(0, () => {
  console.log(final_jobs)
})

<template>
    <PageNav></PageNav>
    <form>
        <select id="dropdownMenu" default="pd_desc">
            <option value="pd_desc">pd_desc</option>
            <option value="ofns_desc">ofns_desc</option>
            <option value="law_cat_cd">law_cat_cd</option>
            <option value="arrest_boro">arrest_boro</option>
            <option value="arrest_precinct">arrest_precinct</option>
            <option value="jurisdiction_code">jurisdiction_code</option>
            <option value="age_group">age_group</option>
            <option value="perp_sex">perp_sex</option>
            <option value="perp_race">perp_race</option>
            <option value="arrest_key">arrest_key</option>
            <option value="arrest_date">arrest_date</option>
            <option value="pd_cd">pd_cd</option>
            <option value="ky_cd">ky_cd</option>
            <option value="law_code">law_code</option>
        </select>
    </form>
    <table>
  <caption>
    Front-end web developer course 2021
  </caption>
  <thead>
    <tr>
      <th scope="col">Person</th>
      <th scope="col">Most interest in</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Chris</th>
      <td>HTML tables</td>
      <td>22</td>
    </tr>
    <tr>
      <th scope="row">Dennis</th>
      <td>Web accessibility</td>
      <td>45</td>
    </tr>
    <tr>
      <th scope="row">Sarah</th>
      <td>JavaScript frameworks</td>
      <td>29</td>
    </tr>
    <tr>
      <th scope="row">Karen</th>
      <td>Web performance</td>
      <td>36</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Average age</th>
      <td>33</td>
    </tr>
  </tfoot>
</table>

</template>

<script setup>

    //use emits to recieve a page number from pagenav component


    //search by a category and add the specific thing to search by
    //add pagination
    //do some css or smth 
    //use stuff from opendata aggregator thingie. 
    //use SODA api queries to accomplish this i think
    import { queryDBLink, fetchData } from '@/utils';
    import PageNav from '@/components/PageNav.vue';
    const entriesPerPage = 100;
    async function paginate(pageNo)
    {
        const link = queryDBLink(
            {
                limit:entriesPerPage,
                offset:entriesPerPage*pageNo-entriesPerPage
            }
        )
        const retrievedData = await fetchData(link);
        console.log(retrievedData)
    }
    paginate(10);
</script>

<style scoped>
</style>
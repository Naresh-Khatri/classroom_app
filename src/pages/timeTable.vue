<template>
  <div class="flex flex-center">
    <!-- content -->
    <!-- style="transform:rotate(90deg);" -->
    <!-- <q-img
     src="../assets/time-table.png"/> -->
    <q-markup-table class="q-mt-lg" separator="cell" flat bordered>
      <thead class="bg-primary text-white">
        <tr>
          <th class="text-left text-italic">Starts</th>
          <th class="text-right text-italic">10:00</th>
          <th class="text-right text-italic">10:45</th>
          <th class="text-right text-italic"></th>
          <th class="text-right text-italic">11:45</th>
          <th class="text-right text-italic">12:30</th>
        </tr>
        <tr>
          <th class="text-left text-italic">Ends</th>
          <th class="text-right text-italic">10:45</th>
          <th class="text-right text-italic">11:30</th>
          <th class="text-right text-italic"></th>
          <th class="text-right text-italic">12:30</th>
          <th class="text-right text-italic">1:15</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">Mon</td>
          <td class="text-right">DAA</td>
          <td class="text-right">OS</td>
          <td class="text-right"></td>
          <td class="text-right">CO</td>
          <td class="text-right">SE</td>
        </tr>
        <tr>
          <td class="text-left">Tue</td>
          <td class="text-right">BFE</td>
          <td class="text-right">NTA</td>
          <td class="text-right"></td>
          <td class="text-right">OS</td>
          <td class="text-right">DAA</td>
        </tr>
        <tr>
          <td class="text-left">Wed</td>
          <td class="text-right">SE</td>
          <td class="text-right">EPR</td>
          <td class="text-right"></td>
          <td class="text-right">DAA</td>
          <td class="text-right">BFE</td>
        </tr>
        <tr>
          <td class="text-left">Thu</td>
          <td class="text-right">OS</td>
          <td class="text-right">CO</td>
          <td class="text-right"></td>
          <td class="text-right">NTA</td>
          <td class="text-right">EPR</td>
        </tr>
        <tr>
          <td class="text-left">Fri</td>
          <td class="text-right">BFE</td>
          <td class="text-right">NTA</td>
          <td class="text-right"></td>
          <td class="text-right">SE</td>
          <td class="text-right">DAA</td>
        </tr>
        <tr>
          <td class="text-left">Sat</td>
          <td class="text-right">CO</td>
          <td class="text-right">EPR</td>
          <td class="text-right"></td>
          <td class="text-right">OS</td>
          <td class="text-right">NTA</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  // name: 'PageName',
};
</script>

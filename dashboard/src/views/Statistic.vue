<template>
  <div id="statistic-page">
    <a-table
      :columns="tableColumns"
      :data-source="dataSource"
      :rowKey="primaryKey"
      :row-selection="rowSelection"
    >
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    const tableColumns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 80
      },
      {
        title: "clientId",
        dataIndex: "clientId",
        key: "clientId"
      },
      {
        title: "humidity",
        dataIndex: "humidity",
        key: "humidity",
        width: 100
      },
      {
        title: "temperature",
        dataIndex: "temperature",
        key: "temperature",
        width: 120
      }
    ];
    return {
      primaryKey: "id",
      tableColumns,
      dataSource: []
    };
  },
  created() {
    this.axios
      .get(`/esp`)
      .then(res => {
        console.log(res.data);
        this.dataSource = res.data;
      })
      .catch(err => console.error(err.response.data));
  }
};
</script>

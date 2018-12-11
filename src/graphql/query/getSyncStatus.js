const query = `
query getSyncStatus($offset: Int, $limit: Int){
  syncRecords(offset: $offset, limit: $limit) {
    _id
    source
    total
    progress
    updated_at
    status
  }
}
`;

export default query;
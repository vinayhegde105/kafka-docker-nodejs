import avro from 'avsc';

export default avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'company',
      type: { type: 'enum', symbols: ['TEKSYSTEMS', 'INSIGHT'] }
    },
    {
      name: 'place',
      type: 'string',
    }
  ]
});

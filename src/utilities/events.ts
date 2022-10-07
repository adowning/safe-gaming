import mitt, { Emitter } from 'mitt';

type Events = {
  component: Object;
  data?: number;
  onUnitUpdate: Object;
};

// const emitter = mitt<Events>(); // inferred as Emitter<Events>
export const emitter: Emitter<Events> = mitt<Events>();

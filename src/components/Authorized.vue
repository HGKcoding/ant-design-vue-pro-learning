<script>
import { check } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots, slots, children } = context;
    console.log(scopedSlots.default(), slots().default, children);
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>

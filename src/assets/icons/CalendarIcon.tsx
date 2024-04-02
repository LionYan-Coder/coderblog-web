import { type IconProps } from '~/assets'

export function CalendarIcon(props: IconProps = {}) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 2V4.12777M8 6V4.12777M16 2V4.12777M16 6V4.12777M20.9597 10C21 10.7878 21 11.7554 21 13C21 15.7956 21 17.1935 20.5433 18.2961C19.9343 19.7663 18.7663 20.9343 17.2961 21.5433C16.1935 22 14.7956 22 12 22C9.20435 22 7.80653 22 6.7039 21.5433C5.23373 20.9343 4.06569 19.7663 3.45672 18.2961C3 17.1935 3 15.7956 3 13C3 11.7554 3 10.7878 3.0403 10M20.9597 10C20.9095 9.01824 20.7967 8.31564 20.5433 7.7039C19.9343 6.23373 18.7663 5.06569 17.2961 4.45672C16.9146 4.29871 16.4978 4.19536 16 4.12777M20.9597 10L3.0403 10M3.0403 10C3.09052 9.01824 3.20333 8.31564 3.45672 7.7039C4.06569 6.23373 5.23373 5.06569 6.7039 4.45672C7.08538 4.29871 7.50219 4.19536 8 4.12777M8 4.12777C8.94106 4 10.1716 4 12 4C13.8284 4 15.0589 4 16 4.12777"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
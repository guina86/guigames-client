import { render } from 'utils/tests'
import { FormLink, FormWrapper } from '.'

describe('<Form />', () => {
  const renderSut = () =>
    render(
      <FormWrapper>
        <FormLink>
          My<a href="#">link</a>
        </FormLink>
      </FormWrapper>
    )

  it('should render the Form', () => {
    const { container } = renderSut()

    expect(container).toMatchInlineSnapshot(`
      .c0 {
        font-size: 1.4rem;
        color: #030517;
        text-align: center;
      }

      .c0 a {
        color: #3CD3C1;
        -webkit-text-decoration: none;
        text-decoration: none;
        border-bottom: 0.1rem solid #3CD3C1;
        -webkit-transition: color,border,0.1s ease-in-out;
        transition: color,border,0.1s ease-in-out;
      }

      .c0 a:hover {
        color: #29b3a3;
        border-bottom: 0.1rem solid #29b3a3;
      }

      <div>
        <div
          class=""
        >
          <div
            class="c0"
          >
            My
            <a
              href="#"
            >
              link
            </a>
          </div>
        </div>
      </div>
    `)
  })
})

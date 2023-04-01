import { ReactElement, useEffect } from 'react'

import { EnvironmentFilled, MailFilled, PhoneFilled } from '@ant-design/icons'
import { NextPageWithLayout } from '@/types/next-page'
import { Col, Row } from 'antd'

import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {

  useEffect(() => {
    document.body.scrollTop = 0
  }, [])

  return (
    <Row style={{ background: 'white' }}>
      <Col
        xxl={{ span: 14, offset: 5 }}
        xl={{ span: 18, offset: 3 }}
        lg={{ span: 20, offset: 2 }}
        span={24}
        offset={0}
        style={{ padding: '0 1rem' }}
      >
        <h2 className="homepage-title">Thông tin liên hệ</h2>
        <div
          style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {/* Info */}
          <div
            style={{
              width: '35%',
              display: 'grid',
              alignContent: 'space-between'
            }}
          >
            <div
              style={{
                background: '#F8F9FA',
                padding: '1rem',
                border: '1px solid #A3A7AB',
                height: 'fit-content'
              }}
            >
              <h4 className="small-title">Địa chỉ</h4>
              <div>
                <EnvironmentFilled
                  style={{ marginRight: '0.5rem', color: '#0080FF' }}
                />
                <span style={{ fontSize: '1rem' }}>
                  Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội
                </span>
              </div>
              <h4 className="small-title" style={{ marginTop: '1.5rem' }}>
                Số điện thoại
              </h4>
              <div>
                <PhoneFilled
                  style={{ marginRight: '0.5rem', color: '#0080FF' }}
                />
                <span style={{ fontSize: '1rem' }}>0362274026</span>
              </div>
              <h4 className="small-title" style={{ marginTop: '1.5rem' }}>
                Địa chỉ Email
              </h4>
              <div>
                <MailFilled
                  style={{ marginRight: '0.5rem', color: '#0080FF' }}
                />
                <span style={{ fontSize: '1rem' }}>
                  eldensong160201@gmail.com
                </span>
              </div>
            </div>

            <div
              style={{
                background: '#F8F9FA',
                padding: '1rem',
                border: '1px solid #A3A7AB',
                height: 'fit-content'
              }}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Thông tin thêm
              </div>
              <div style={{ fontSize: '1rem', color: '#4D4D75' }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
                ad iure porro mollitia architecto hic consequuntur. Distinctio
                nisi perferendis dolore, ipsa consectetur? Fugiat quaerat eos
                qui, libero neque sed nulla.
                <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Provident rerum unde possimus molestias dolorem fuga, illo quis
                fugiat!
              </div>
            </div>
          </div>
          {/* Map */}
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.473788316849!2d105.73291811476372!3d21.05373098598486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1680190107071!5m2!1svi!2s"
              width="600"
              height="450"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page

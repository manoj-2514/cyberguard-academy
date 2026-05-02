"""Add module and ai_explanation columns

Revision ID: 1a2b3c4d5e6f
Revises: 
Create Date: 2026-04-26 00:45:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a2b3c4d5e6f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Use batch_op for SQLite support
    with op.batch_alter_table('assessment_sessions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('module', sa.String(), nullable=False, server_default='phishing'))

    with op.batch_alter_table('questions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('module', sa.String(), nullable=False, server_default='phishing'))
        batch_op.add_column(sa.Column('ai_explanation', sa.JSON(), nullable=True))

    with op.batch_alter_table('scenarios', schema=None) as batch_op:
        batch_op.add_column(sa.Column('module', sa.String(), nullable=False, server_default='phishing'))


def downgrade() -> None:
    with op.batch_alter_table('scenarios', schema=None) as batch_op:
        batch_op.drop_column('module')

    with op.batch_alter_table('questions', schema=None) as batch_op:
        batch_op.drop_column('ai_explanation')
        batch_op.drop_column('module')

    with op.batch_alter_table('assessment_sessions', schema=None) as batch_op:
        batch_op.drop_column('module')
